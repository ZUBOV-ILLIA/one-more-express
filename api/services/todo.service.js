const { v4: uuidv4 } = require('uuid');
const db = require('../utils/db');

const getAll = async () => {
  const todos = await db.query(`SELECT * FROM todos;`);

  return todos.rows;
};

const getById = async id => {
  const todo = await db.query(
    `
      SELECT * FROM todos
      WHERE id = $1;
    `,
    [id],
  );

  return todo.rows[0] || null;
};

const create = async title => {
  const id = uuidv4();

  await db.query(
    `
    INSERT INTO todos (id, userId, title, completed)
    VALUES ($1, 1, $2, false);
  `,
    [id, title.trim()],
  );

  const todo = await getById(id);

  return todo;
};

const update = async ({ id, title, completed }) => {
  await db.query(
    `
      UPDATE todos
      SET title = $2, completed = $3
      WHERE id = $1;
    `,
    [id, title.trim(), completed],
  );
};

const updateMany = async (ids, completed) => {
  await db.query(
    `
      UPDATE todos
      SET completed = $1
      WHERE id IN (${ids.map(id => `'${id}'`).join(',')});
    `,
    [completed],
  );
};

const remove = async id => {
  await db.query(
    `
      DELETE FROM todos WHERE id = $1;
    `,
    [id],
  );
};

const removeMany = async ids => {
  if (ids.some(id => !isUUID(id))) {
    throw new Error('Invalid ID format');
  }

  await db.query(
    `
      DELETE FROM todos
      WHERE id = ANY($1);
    `,
    [ids],
  );
};

function isUUID(str) {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  return uuidRegex.test(str);
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  updateMany,
  remove,
  removeMany,
  db,
};

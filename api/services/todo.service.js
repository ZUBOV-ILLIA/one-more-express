const { v4: uuidv4 } = require('uuid');
const { sql } = require('@vercel/postgres');
const pg = require('pg');
const { Client } = pg;
const dotenv = require('dotenv').config();

const client = new Client({
  user: dotenv.parsed.USER,
  password: dotenv.parsed.PASSWORD,
  host: dotenv.parsed.HOST,
  port: dotenv.parsed.PORT,
  database: dotenv.parsed.DATABASE,
});

let DB;

// local DB or vercel DB
if (process.env.NODE_ENV === 'loc') {
  DB = client;

  connectDB();
} else {
  DB = sql;
}

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to the database');
  } catch (err) {
    console.error('Error connecting to the database', err);
  }
}

async function createTableTodos() {
  await client.query(`
    CREATE TABLE IF NOT EXISTS todos (
      id TEXT,
      userId INTEGER,
      title TEXT,
      completed BOOLEAN
    );
  `);
}
createTableTodos();

const getAll = async () => {
  const todos = await DB.query(`SELECT * FROM todos;`);

  return todos.rows;
};

const getById = async id => {
  const todo = await DB.query(
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

  await DB.query(
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
  await DB.query(
    `
      UPDATE todos
      SET title = $2, completed = $3
      WHERE id = $1;
    `,
    [id, title.trim(), completed],
  );
};

const updateMany = async (ids, completed) => {
  await DB.query(
    `
      UPDATE todos
      SET completed = $1
      WHERE id IN (${ids.map(id => `'${id}'`).join(',')});
    `,
    [completed],
  );
};

const remove = async id => {
  await DB.query(
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

  await DB.query(
    `
      DELETE FROM todos
      WHERE id IN (${ids.map(id => `'${id}'`).join(', ')});
    `,
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
};

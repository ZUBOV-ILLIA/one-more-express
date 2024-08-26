let db = {
  users: [
    { id: 1, username: 'Frodo Begins', role: 'hobbit', skill: 'blue sword' },
    { id: 2, username: 'Samwise Gamgee', role: 'hobbit', skill: 'friendship' },
    { id: 3, username: 'Gendalf', role: 'wizard', skill: 'magic' },
    { id: 4, username: 'Legolas', role: 'elf', skill: 'archery' },
    { id: 5, username: 'Aragorn', role: 'human', skill: 'sword' },
  ],
};

let todos = [
  {
    userId: 1,
    id: 'fbbb8a42-df38-4ee4-afa6-1b62718693ff',
    title: 'Learn HTML',
    completed: false,
  },
  {
    userId: 1,
    id: 'fbbb8a42-df38-43e4-afa6-1b62718693ff',
    title: 'Learn CSS',
    completed: false,
  },
  {
    userId: 1,
    id: 'fbb18a42-df38-43e4-afa6-1b62718693ff',
    title: 'Learn JS',
    completed: true,
  },
  {
    userId: 2,
    id: 'fb3b8a42-df38-43e4-afa6-1b62718693ff',
    title: 'Learn React',
    completed: false,
  },
  {
    userId: 2,
    id: 'fb4b8a42-df38-43e4-afa6-1b62718693ff',
    title: 'Learn Redux',
    completed: false,
  },
  {
    userId: 3,
    id: 'fb5b8a42-df38-43e4-afa6-1b62718693ff',
    title: 'Learn Node.js',
    completed: false,
  },
  {
    userId: 4,
    id: 'fbeb8a42-df38-43e4-afa6-1b62718693ff',
    title: 'Learn Express',
    completed: false,
  },
  {
    userId: 5,
    id: 'fbab8a42-df38-43e4-afa6-1b62718693ff',
    title: 'Learn MongoDB',
    completed: false,
  },
  {
    userId: 5,
    id: 'fbzb8a42-df38-43e4-afa6-1b62718693ff',
    title: 'Learn SQL',
    completed: false,
  },
  {
    userId: 5,
    id: 'fbgg8a42-df38-43e4-afa6-1b62718693ff',
    title: 'Learn Python',
    completed: false,
  },
];

const { v4: uuidv4 } = require('uuid');
const { sql } = require('@vercel/postgres');
const dotenv = require('dotenv').config();

// const pg = require('pg');
// const { Client } = pg;

// const client = new Client({
//   user: 'postgres',
//   password: '11111111',
//   host: 'localhost',
//   port: 5432,
//   database: 'one-more-express-postgres',
// });

// async function connectDB() {
//   try {
//     await client.connect();
//     console.log('Connected to the database');
//   } catch (err) {
//     console.error('Error connecting to the database', err);
//   }
// }
// connectDB();

// async function result(params) {
//   const res = await client.query('SELECT * FROM todos');
//   console.log(res.rows);
// }
// result();

async function createTable() {
  try {
    const result =
      // await sql`CREATE TABLE todos ( id text, userId integer, title text, completed boolean);`;
      // await sql`INSERT INTO todos (id, userId, title, completed) VALUES ('fbbb8a42-df38-43e4-afa6-1b62718693ff', 1, 'Learn CSS', false);`;

      await sql`SELECT * FROM todos;`;

    // return response.status(200).json({ result });
  } catch (error) {
    console.error('Error creating table:', error);
  }
}
// createTable();

const getAll = async () => {
  const todos = await sql.query(`SELECT * FROM todos;`);

  return todos.rows;
};

const getById = async id => {
  const todo = await sql.query(
    `
      SELECT * FROM todos
      WHERE id = '${id}';
    `,
  );

  return todo.rows[0] || null;
};

const create = async title => {
  const id = uuidv4();

  await sql.query(
    `
    INSERT INTO todos (id, userId, title, completed)
    VALUES ('${id}', 1, '${title.trim()}', false);
  `,
  );

  const todo = await getById(id);

  return todo;
};

const update = async ({ id, title, completed }) => {
  await sql.query(
    `
      UPDATE todos
      SET title = '${title.trim()}', completed = ${completed}
      WHERE id = '${id}';
    `,
  );
};

const updateMany = async (ids, completed) => {
  await sql.query(
    `
      UPDATE todos
      SET completed = ${completed}
      WHERE id IN (${ids.map(id => `'${id}'`).join(',')});
    `,
  );
};

const remove = async id => {
  await sql.query(`DELETE FROM todos WHERE id = '${id}';`);
};

const removeMany = async ids => {
  await sql.query(
    `DELETE FROM todos WHERE id IN (${ids.map(id => `'${id}'`).join(', ')});`,
  );
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  updateMany,
  remove,
  removeMany,
};

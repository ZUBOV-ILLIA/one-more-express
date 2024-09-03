const { sql } = require('@vercel/postgres');
const pg = require('pg');
const { Client, Pool } = pg;
const dotenv = require('dotenv').config();
const { Sequelize } = require('sequelize');

const client = new Pool({
  user: dotenv.parsed.USER,
  password: dotenv.parsed.PASSWORD,
  host: dotenv.parsed.HOST,
  port: dotenv.parsed.PORT,
  database: dotenv.parsed.DATABASE,
});

const sequelize = new Sequelize(
  dotenv.parsed.DATABASE,
  dotenv.parsed.USER,
  dotenv.parsed.PASSWORD,
  {
    host: dotenv.parsed.HOST,
    port: dotenv.parsed.PORT,
    dialect: 'postgres',
  },
);

let db;

// local DB or vercel DB
if (process.env.NODE_ENV === 'loc') {
  db = sequelize;

  connectDB();
} else {
  db = sql;
}

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to the database');
  } catch (err) {
    console.error('Error connecting to the database');
  }
}

async function createTableTodos() {
  try {
    await client.query(
      `
        CREATE TABLE IF NOT EXISTS todos (
          id TEXT,
          userId INTEGER,
          title TEXT,
          completed BOOLEAN
        );
      `,
    );
  } catch (error) {
    console.error('Error creating table =======', error);
  }
}

createTableTodos();

module.exports = db;

// let db = {
//   users: [
//     { id: 1, username: 'Frodo Begins', role: 'hobbit', skill: 'blue sword' },
//     { id: 2, username: 'Samwise Gamgee', role: 'hobbit', skill: 'friendship' },
//     { id: 3, username: 'Gendalf', role: 'wizard', skill: 'magic' },
//     { id: 4, username: 'Legolas', role: 'elf', skill: 'archery' },
//     { id: 5, username: 'Aragorn', role: 'human', skill: 'sword' },
//   ],
// };

// let todos = [
//   {
//     userId: 1,
//     id: 'fbbb8a42-df38-4ee4-afa6-1b62718693ff',
//     title: 'Learn HTML',
//     completed: false,
//   },
//   {
//     userId: 1,
//     id: 'fbbb8a42-df38-43e4-afa6-1b62718693ff',
//     title: 'Learn CSS',
//     completed: false,
//   },
//   {
//     userId: 1,
//     id: 'fbb18a42-df38-43e4-afa6-1b62718693ff',
//     title: 'Learn JS',
//     completed: true,
//   },
//   {
//     userId: 2,
//     id: 'fb3b8a42-df38-43e4-afa6-1b62718693ff',
//     title: 'Learn React',
//     completed: false,
//   },
//   {
//     userId: 2,
//     id: 'fb4b8a42-df38-43e4-afa6-1b62718693ff',
//     title: 'Learn Redux',
//     completed: false,
//   },
//   {
//     userId: 3,
//     id: 'fb5b8a42-df38-43e4-afa6-1b62718693ff',
//     title: 'Learn Node.js',
//     completed: false,
//   },
//   {
//     userId: 4,
//     id: 'fbeb8a42-df38-43e4-afa6-1b62718693ff',
//     title: 'Learn Express',
//     completed: false,
//   },
//   {
//     userId: 5,
//     id: 'fbab8a42-df38-43e4-afa6-1b62718693ff',
//     title: 'Learn MongoDB',
//     completed: false,
//   },
//   {
//     userId: 5,
//     id: 'fbzb8a42-df38-43e4-afa6-1b62718693ff',
//     title: 'Learn SQL',
//     completed: false,
//   },
//   {
//     userId: 5,
//     id: 'fbgg8a42-df38-43e4-afa6-1b62718693ff',
//     title: 'Learn Python',
//     completed: false,
//   },
// ];

const { v4: uuidv4 } = require('uuid');
const db = require('../utils/db');
const { DataTypes } = require('sequelize');

const Todo = db.define(
  'Todo',
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    userid: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: 'todos',
    createdAt: false,
    updatedAt: false,
  },
);

const getAll = async () => {
  const todos = await Todo.findAll();

  return todos;
};

const getById = async id => {
  const todo = await Todo.findByPk(id);

  return todo || null;
};

const create = async title => {
  const id = uuidv4();

  console.log(id);

  await Todo.create({ id, userid: 1, title: title.trim(), completed: false });

  const todo = await getById(id);

  return todo;
};

const update = async ({ id, title, completed }) => {
  await Todo.update({ title: title.trim(), completed }, { where: { id } });
};

const updateMany = async (ids, completed) => {
  await Todo.update({ completed }, { where: { id: ids } });
};

const remove = async id => {
  await Todo.destroy({ where: { id } });
};

const removeMany = async ids => {
  if (ids.some(id => !isUUID(id))) {
    throw new Error('Invalid ID format');
  }

  await Todo.destroy({ where: { id: ids } });
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

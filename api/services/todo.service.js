let db = {
  users: [
    { id: 1, username: 'Frodo Begins', role: 'hobbit', skill: 'blue sword' },
    { id: 2, username: 'Samwise Gamgee', role: 'hobbit', skill: 'friendship' },
    { id: 3, username: 'Gendalf', role: 'wizard', skill: 'magic' },
    { id: 4, username: 'Legolas', role: 'elf', skill: 'archery' },
    { id: 5, username: 'Aragorn', role: 'human', skill: 'sword' }, 
  ]
}

let todos = [
  { userId: 1, id: 'fbbb8a42-df38-4ee4-afa6-1b62718693ff', title: 'Learn HTML', completed: false },
  { userId: 1, id: 'fbbb8a42-df38-43e4-afa6-1b62718693ff', title: 'Learn CSS', completed: false },
  { userId: 1, id: 'fbb18a42-df38-43e4-afa6-1b62718693ff', title: 'Learn JS', completed: true },
  { userId: 2, id: 'fb3b8a42-df38-43e4-afa6-1b62718693ff', title: 'Learn React', completed: false },
  { userId: 2, id: 'fb4b8a42-df38-43e4-afa6-1b62718693ff', title: 'Learn Redux', completed: false },
  { userId: 3, id: 'fb5b8a42-df38-43e4-afa6-1b62718693ff', title: 'Learn Node.js', completed: false },
  { userId: 4, id: 'fbeb8a42-df38-43e4-afa6-1b62718693ff', title: 'Learn Express', completed: false },
  { userId: 5, id: 'fbab8a42-df38-43e4-afa6-1b62718693ff', title: 'Learn MongoDB', completed: false },
  { userId: 5, id: 'fbzb8a42-df38-43e4-afa6-1b62718693ff', title: 'Learn SQL', completed: false },
  { userId: 5, id: 'fbgg8a42-df38-43e4-afa6-1b62718693ff', title: 'Learn Python', completed: false },
];

const { v4: uuidv4 }  = require('uuid');


const getAll = () => {
  return todos;
}

const getById = (id) => {
  return todos.find(todo => todo.id === id) || null;
}

const create = (title) => {
  const todo = { 
    userId: 1,
    id: uuidv4(),
    title: title.trim(),
    completed: false
  };

  todos.unshift(todo);

  return todo;
}

const update = ({ id, title, completed }) => {
  todos = todos.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        title,
        completed,
      };
    }

    return item;
  });
}

const updateMany = (ids, completed) => {
  todos = todos.map((item) => {
    if (ids.includes(item.id)) {
      return {
        ...item,
        completed,
      };
    }

    return item;
  });
}

const remove = (id) => {
  todos = todos.filter((item) => item.id !== id);
}

const removeMany = (ids) => {
  todos = todos.filter((item) => !ids.includes(item.id));
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  updateMany,
  remove,
  removeMany
}

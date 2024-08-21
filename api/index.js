const express = require("express");
const cors = require('cors');
// const path = require('path');
const app = express();
const port = 3001;

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

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("<h1>Express on Vercel</h1>")
});

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todo', (req, res, ) => {
  const { userId, id, title, completed } = req.body;

  // Check if all required fields are present
  if (!userId || !id || !title || completed === undefined) {
    res.status(400).json({ error: 'All fields are required!' });
    return;
  }

  // Check if title is not an empty string
  if (typeof title !== 'string' || title.trim() === '') {
    res.status(400).json({ error: 'Title cannot be empty!' });
    return;
  }

  // Check if completed is a boolean
  if (typeof completed !== 'boolean') {
    res.status(400).json({ error: 'Completed must be a boolean!' });
    return;
  }

  const newTodo = { userId, id, title: title.trim(), completed };
  todos.unshift(newTodo);

  res.json(newTodo);
});

app.post('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { todo } = req.body;

  if (!todo) {
    res.status(400).json({ error: 'Todo is required!' });

    return;
  }

  todos = todos.map((item) => {
    if (item.id === id) {
      return todo;
    }

    return item;
  });

  res.sendStatus(200);
});

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;

  todos = todos.filter((item) => item.id !== id);

  res.sendStatus(200);
});

app.listen(port, () => {
  // console.clear();
  console.log(`http://localhost:${port}`)
});


module.exports = app;

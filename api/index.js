const express = require("express");
const app = express();
const cors = require('cors');
const path = require('path');
const fs = require('fs');

let todos = fs.readFileSync(path.join(__dirname, 'DB.json'), 'utf-8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
});

todos = JSON.parse(todos);

console.log(todos, typeof todos);

const port = 3001;
// let { todos, db } = require('./DB');



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
  fs.writeFileSync(path.join(__dirname, 'DB.json'), JSON.stringify(todos));

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
  
  fs.writeFileSync(path.join(__dirname, 'DB.json'), JSON.stringify(todos));
});

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;

  todos = todos.filter((item) => item.id !== id);

  fs.writeFileSync(path.join(__dirname, 'DB.json'), JSON.stringify(todos));

  res.sendStatus(200);
});

app.listen(port, () => {
  // console.clear();
  console.log(`http://localhost:${port}`)
});


module.exports = app;

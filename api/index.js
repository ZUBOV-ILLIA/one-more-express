const express = require("express");
const app = express();
const cors = require('cors');
const todoService = require('./services/todo.service');

const port = 3001;
let { todos, db } = require('./DB');

// put - update all exept id
// patch - update some key


// mvc - model view controller

app.use(cors());
app.use(express.json());

// app.use((req, res, next) => {
//   setTimeout(() => {
//     next();
//   }, 3000);
// });

app.get("/", (req, res) => {
  res.send("<h1>Express on Vercel</h1>")
});

app.get('/todos', (req, res) => {
  res.json(todoService.getAll());
});

app.get('/todos/:id', (req, res) => {
  const { id } = req.params;
  const todo = todoService.getById(id);

  if (!todo) {
    res.sendStatus(404);
    
    return;
  }

  res.json(todo);
});

app.post('/todos', (req, res, ) => {
  const { title } = req.body;

  if (typeof title !== 'string') {
    res.status(400).json({ error: 'Title must be a string!' });
    return;
  }

  if (!title.trim()) {
    res.status(400).json({ error: 'Title is required!' });
    return;
  }

  const todo = todoService.create(title);

  res.json(todo);
});

app.patch('/todos/:id', (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  if (title === undefined || completed === undefined) {
    res.status(400).json({ error: 'Title and Completed is required!' });
  }

  if (title && typeof title !== 'string') {
    res.status(400).json({ error: 'Title must be a string!' });
    return;
  }

  if (typeof completed !== 'boolean') {
    res.status(400).json({ error: 'Completed must be a boolean!' });
    return;
  }
  
  todos = todoService.update({ id, title, completed });

  res.sendStatus(200);
});

app.patch('/todos', (req, res) => {
  const { ids, action, completed } = req.body;

  if (!ids) {
    res.status(400).json({ error: 'Ids is required!' });
    return;
  }

  if (!Array.isArray(ids)) {
    res.status(400).json({ error: 'Ids must be an array!' });
    return;
  }

  if (action === undefined) {
    res.status(400).json({ error: 'Action is required!' });
    return;
  }

  if (action === 'delete') {
    todoService.removeMany(ids);
  }

  if (action === 'toggle') {
    if (completed === undefined) {
      res.status(400).json({ error: 'Completed is required!' });
      return;
    }
  
    if (typeof completed !== 'boolean') {
      res.status(400).json({ error: 'Completed must be a boolean!' });
      return;
    }

    todoService.updateMany(ids, completed);
  }
  
  res.sendStatus(200);
});

app.delete('/todos/:id', (req, res) => {
  const { id } = req.params;

  if (!todoService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  todoService.remove(id);

  res.sendStatus(200);
});

app.delete('/todos', (req, res) => {
  const { ids } = req.body;

  if (!ids) {
    res.status(400).json({ error: 'Ids is required!' });
    return;
  }

  if (!Array.isArray(ids)) {
    res.status(400).json({ error: 'Ids must be an array!' });
    return;
  }

  todoService.removeMany(ids);

  res.sendStatus(200);
});

app.listen(port, () => {
  // console.clear();
  console.log(`http://localhost:${port}`)
});


module.exports = app;

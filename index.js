const express = require('express');
const path = require('path');
const cors = require('cors');
const { error } = require('console');
const app = express();
const port = 3001;

const db = {
  users: [
    { id: 1, username: 'Frodo Begins', role: 'hobbit', skill: 'blue sword' },
    { id: 2, username: 'Samwise Gamgee', role: 'hobbit', skill: 'friendship' }
  ]
}

const todos = [];

app.use(cors());
app.use(express.json());

// app.use('/', (req, res, next) => {
//   console.log(path.join(__dirname, 'index.html'));

//   res.write(`<h1>${path.join(__dirname, 'index.html')}</h1>`)
//   next();
// });

app.post('/todo', (req, res, ) => {
  todos.push(req.body.todo);

  res.json(todos);
});

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.get('/123', (req, res) => {
  const userId = req.query.userId;
  const neededUser = db.users.find(user => user.id == userId);

  res.json(neededUser || { error: 'User not exists!' });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
});

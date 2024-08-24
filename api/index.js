const express = require('express');
const app = express();
const cors = require('cors');

const todoRouter = require('./routes/todo.routes');

const port = 3001;
let { todos, db } = require('./DB');

// put - update all exept id
// patch - update some key

// mvc - model view controller

app.use(cors());

app.use('/todos', express.json(), todoRouter);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

module.exports = app;

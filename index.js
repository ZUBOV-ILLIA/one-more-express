const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use('/', (req, res, next) => {
  console.log(path.join(__dirname, 'index.html'));

  res.write(`<h1>${path.join(__dirname, 'index.html')}</h1>`)
  next();
});

app.get('/123', (req, res) => {
  res.end('123')
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
});

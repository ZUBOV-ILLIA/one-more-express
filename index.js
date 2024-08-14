const express = require('express');
const path = require('path');
const cors = require('cors')
const app = express();
const port = 3000;

app.use(cors());

// app.use('/', (req, res, next) => {
//   console.log(path.join(__dirname, 'index.html'));

//   res.write(`<h1>${path.join(__dirname, 'index.html')}</h1>`)
//   next();
// });

app.get('/123', (req, res) => {
  res.end('bla bla bla bla bla')
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`)
});

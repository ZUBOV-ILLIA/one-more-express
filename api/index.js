const express = require('express');
const app = express();
const cors = require('cors');

const todoRouter = require('./routes/todo.routes');
const db = require('./utils/db');

const port = 3001;

// put - update all exept id
// patch - update some key

// mvc - model view controller

app.use(cors());

app.use('/todos', express.json(), todoRouter);

const server = app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

function cleanUp() {
  server.close(async () => {
    await db.end();

    process.exit(0);
  });
}

process.on('SIGTERM', cleanUp);
process.on('SIGINT', cleanUp);
process.on('unhandledRejection', err => {
  console.error(err);
  cleanUp();
});
process.on('uncaughtException', err => {
  console.error(err);
  cleanUp();
});

/*
  SIGTERM это сигнал, который операционная система отправляет
  процессу при остановке извне. Это может произойти, когда мы
  рестартуем приложение. Windows не поддерживает SIGTERM, зато
  поддерживает SIGINT, поэтому мы добавляем обработчики обоих сигналов.

  Дополнительно стоит подписаться на обработчики глобальных ошибок
  Node.js, чтобы освобождать ресурсы в случае фатальных ошибок:
*/

module.exports = app;

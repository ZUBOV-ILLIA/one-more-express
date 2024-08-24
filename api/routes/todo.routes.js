const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controller');

router.get('/', todoController.get);

router.get('/:id', todoController.getOne);

router.post('/', todoController.create);

router.patch('/:id', todoController.update);

router.delete('/:id', todoController.remove);

const isAction = action => {
  // middleware
  return (req, res, next) => {
    if (req.body.action === action) {
      next(); // go to controller removeMany
      return;
    } else {
      next('route'); // go to next route (middleware, updateMany)
    }
  };
};

router.patch('/', isAction('delete'), todoController.removeMany);

router.patch('/', isAction('toggle'), todoController.updateMany);

module.exports = router;

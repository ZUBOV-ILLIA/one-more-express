const todoService = require('../services/todo.service');

const get = async (req, res) => {
  try {
    const todos = await todoService.getAll();

    res.json(todos);
  } catch (error) {
    console.log('============== error ==============');
    res.sendStatus(500);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const todo = await todoService.getById(id);

  if (!todo) {
    res.sendStatus(404);

    return;
  }

  res.json(todo);
};

const create = async (req, res) => {
  const { title } = req.body;

  if (typeof title !== 'string') {
    res.status(400).json({ error: 'Title must be a string!' });
    return;
  }

  if (!title.trim()) {
    res.status(400).json({ error: 'Title is required!' });
    return;
  }

  const todo = await todoService.create(title);

  res.json(todo);
};

const update = async (req, res) => {
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

  await todoService.update({ id, title, completed });

  res.sendStatus(200);
};

const updateMany = async (req, res) => {
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

  if (completed === undefined) {
    res.status(400).json({ error: 'Completed is required!' });
    return;
  }

  if (typeof completed !== 'boolean') {
    res.status(400).json({ error: 'Completed must be a boolean!' });
    return;
  }

  await todoService.updateMany(ids, completed);

  res.sendStatus(200);
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!todoService.getById(id)) {
    res.sendStatus(404);

    return;
  }

  await todoService.remove(id);

  res.sendStatus(200);
};

const removeMany = async (req, res) => {
  const { ids, action } = req.body;

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

  await todoService.removeMany(ids);

  res.sendStatus(200);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  updateMany,
  remove,
  removeMany,
};

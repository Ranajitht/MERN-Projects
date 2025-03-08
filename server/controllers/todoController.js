const Todo = require('../models/Todo');

// Create a new todo
exports.createTodo = async (req, res) => {
  const { title, completed = false } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }
  try {
    const newTodo = new Todo({ title, completed, user: req.userId });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all todos (Admin only)
exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get todos for the authenticated user
exports.getUserTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.userId });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a todo (Admin or owner only)
exports.updateTodo = async (req, res) => {
  try {
    const { title, completed } = req.body;
    const todo = await Todo.findOne({ _id: req.params.id });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    if (req.userRole !== 'admin' && todo.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    todo.title = title || todo.title;
    todo.completed = completed !== undefined ? completed : todo.completed;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a todo (Admin or owner only)
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id });

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    if (req.userRole !== 'admin' && todo.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await todo.remove();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
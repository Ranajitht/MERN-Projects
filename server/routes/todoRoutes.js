const express = require('express');
const todoController = require('../controllers/todoController');
const authenticate = require('../middleware/auth');
const isAdmin = require('../middleware/role');

const router = express.Router();

// Create a new todo
router.post('/', authenticate, todoController.createTodo);

// Get all todos (Admin only)
router.get('/', authenticate, isAdmin, todoController.getAllTodos);

// Get todos for the authenticated user
router.get('/user', authenticate, todoController.getUserTodos);

// Update a todo
router.put('/:id', authenticate, todoController.updateTodo);

// Delete a todo
router.delete('/:id', authenticate, todoController.deleteTodo);

module.exports = router;
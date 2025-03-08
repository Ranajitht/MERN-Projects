const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes'); // Add this line
require('dotenv').config();

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);
app.use('/users', userRoutes); // Add this line

module.exports = app;
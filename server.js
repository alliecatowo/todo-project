// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Middleware
app.use(express.json());

// Define ToDo schema and model here (see Step 2)

// Define CRUD routes here (see Step 3)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// server.js (continued)
const todoSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});

const Todo = mongoose.model('Todo', todoSchema);

// server.js (continued)
// Create a new ToDo
app.post('/api/todos', async (req, res) => {
  try {
    const { text } = req.body;
    const todo = new Todo({ text, completed: false });
    await todo.save();
    res.status(201).json(todo);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create ToDo' });
  }
});

// Read all ToDos
app.get('/api/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve ToDos' });
  }
});

// Update a ToDo
app.put('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { text, completed } = req.body;
    const todo = await Todo.findByIdAndUpdate(id, { text, completed }, { new: true });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update ToDo' });
  }
});

// Delete a ToDo
app.delete('/api/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: 'Failed to delete ToDo' });
  }
});
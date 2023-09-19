const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override'); // Import the method override
const path = require('path'); // Import the path module

const app = express();
const port = 3000;

// const getTodos = require("./routes/getTodos")

// Middleware to parse JSON data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(methodOverride('_method')); // Enable method-override middleware

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// In-memory storage for TODO items
let todos = [];

app.get('/', (req, res) => {
  res.send('This is my todo app');
});

// Render the EJS template with TODO items
app.get('/todos', (req, res) => {
  res.render('todos', { todos });
});


// Add a new TODO item
app.post('/todos', (req, res) => {
  const todo = req.body.todo;
  todos.push(todo);
  // res.status(201).json(todo);

  // Redirect to the '/todos' route
  res.redirect('/todos');
});

// Delete a TODO item by ID
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id;
  todos.splice(id, 1);
  // todos = todos.filter(todo => todo.id !== id);
  // res.sendStatus(204);
  res.redirect('/todos');
});

  
 // Update a TODO item
app.put('/todos/:id', (req, res) => {
  const id = req.params.id;
  const todo = req.body.todo;
  todos[id] = todo;
  res.redirect('/todos');
});

// Start the server
app.listen(port, () => {
  console.log(`TODO app server is running on http://localhost:${port}`);
});

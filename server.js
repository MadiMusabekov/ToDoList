const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(__dirname));


// In-memory array to store tasks
let tasks = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve the index.html file as the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// API endpoint to get the list of tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// API endpoint to add a new task
app.post('/api/tasks', (req, res) => {
  const newTask = req.body.task;
  if (newTask) {
    tasks.push(newTask);
    res.sendStatus(201);
  } else {
    res.sendStatus(400);
  }
});

// API endpoint to delete a task
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((task, index) => index !== taskId);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Todo List app listening at http://localhost:${port}`);
});

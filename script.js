const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Function to render the list of tasks
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${task}</span>
      <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

// Function to add a new task
function addTask() {
    const task = taskInput.value.trim();
    if (task !== '') {
      fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task }),
      })
        .then((response) => {
          if (response.ok) {
            loadTasks(); // Reload tasks after successful addition
          } else {
            throw new Error('Failed to add task.');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
  

// Function to delete a task
function deleteTask(index) {
  fetch(`/api/tasks/${index}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.ok) {
        loadTasks();
      } else {
        throw new Error('Failed to delete task.');
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

// Function to load tasks from the server
function loadTasks() {
  fetch('/api/tasks')
    .then((response) => response.json())
    .then((data) => {
      tasks = data;
      renderTasks();
    })
    .catch((error) => {
      console.error(error);
    });
}

// Load tasks when the page is ready
document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
});

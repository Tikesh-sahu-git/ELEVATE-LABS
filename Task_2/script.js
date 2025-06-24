// DOM Elements
const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const prioritySelect = document.getElementById('priority-select');
const filterButtons = document.querySelectorAll('.filter-btn');
const clearBtn = document.getElementById('clear-btn');
const modeSwitch = document.getElementById('mode-switch');

// Load existing tasks and theme
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

// Apply saved theme
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  modeSwitch.checked = true;
}

// Theme toggle
modeSwitch.addEventListener('change', () => {
  document.body.classList.toggle('dark');
  if (document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks with current filter
function renderTasks() {
  taskList.innerHTML = '';

  tasks
    .filter(task => {
      if (currentFilter === 'completed') return task.completed;
      if (currentFilter === 'active') return !task.completed;
      return true;
    })
    .forEach(task => {
      const li = document.createElement('li');
      li.className = `task-item priority-${task.priority}`;
      if (task.completed) li.classList.add('completed');

      const span = document.createElement('span');
      span.textContent = task.text;
      span.addEventListener('click', () => {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
      });

      const delBtn = document.createElement('button');
      delBtn.textContent = 'Delete';
      delBtn.addEventListener('click', () => {
        tasks = tasks.filter(t => t !== task);
        saveTasks();
        renderTasks();
      });

      li.append(span, delBtn);
      taskList.appendChild(li);
    });
}

// Add task
function addTask() {
  const text = taskInput.value.trim();
  const priority = prioritySelect.value;

  if (text !== '') {
    tasks.push({ text, priority, completed: false });
    taskInput.value = '';
    saveTasks();
    renderTasks();
  }
}

// Add on button click
addBtn.addEventListener('click', addTask);

// Add on Enter key
taskInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    addTask();
  }
});

// Filter buttons
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

// Clear all
clearBtn.addEventListener('click', () => {
  if (confirm('Clear all tasks?')) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
});

// Loader animation
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader-wrapper');
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 1000); // Delay before hiding
});

// Initial render
renderTasks();

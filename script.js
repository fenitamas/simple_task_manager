const tasks = [
  { id: 1, title: 'Buy groceries', completed: false },
  { id: 2, title: 'Read a book', completed: true }
];

const taskList = document.getElementById('task-list');
const addTaskForm = document.getElementById('add-task-form');
const newTaskInput = document.getElementById('new-task-input');
const validationMessage = document.getElementById('validation-message');

const filterAllBtn = document.getElementById('filter-all');
const filterPendingBtn = document.getElementById('filter-pending');
const filterCompletedBtn = document.getElementById('filter-completed');

let currentFilter = 'all';

// Render tasks based on filter
function renderTasks() {
  taskList.innerHTML = '';

  let filteredTasks = [];
  if (currentFilter === 'all') {
    filteredTasks = tasks;
  } else if (currentFilter === 'pending') {
    filteredTasks = tasks.filter(task => !task.completed);
  } else if (currentFilter === 'completed') {
    filteredTasks = tasks.filter(task => task.completed);
  }

  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = task.title;
    li.className = task.completed ? 'completed' : '';

    // Complete button
    const completeBtn = document.createElement('button');
    completeBtn.textContent = task.completed ? 'Undo' : 'Complete';
    completeBtn.className = 'complete-btn';
    completeBtn.onclick = () => toggleComplete(task.id);

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = () => deleteTask(task.id);

    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

// Toggle task complete status
function toggleComplete(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}

// Delete task
function deleteTask(id) {
  const index = tasks.findIndex(t => t.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    renderTasks();
  }
}

// Add new task
addTaskForm.addEventListener('submit', e => {
  e.preventDefault();
  validationMessage.textContent = '';

  const title = newTaskInput.value.trim();

  if (!title) {
    validationMessage.textContent = 'Task title cannot be empty.';
    return;
  }

  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    completed: false
  };

  tasks.push(newTask);
  newTaskInput.value = '';
  renderTasks();
});

// Filter buttons
filterAllBtn.addEventListener('click', () => setFilter('all'));
filterPendingBtn.addEventListener('click', () => setFilter('pending'));
filterCompletedBtn.addEventListener('click', () => setFilter('completed'));

function setFilter(filter) {
  currentFilter = filter;
  filterAllBtn.classList.remove('active');
  filterPendingBtn.classList.remove('active');
  filterCompletedBtn.classList.remove('active');

  if (filter === 'all') filterAllBtn.classList.add('active');
  else if (filter === 'pending') filterPendingBtn.classList.add('active');
  else if (filter === 'completed') filterCompletedBtn.classList.add('active');

  renderTasks();
}

// Initial render
renderTasks();

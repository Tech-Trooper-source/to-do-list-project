const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const currentDateElement = document.getElementById('current-date');
const toastContainer = document.getElementById('toast-container');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function updateCalendar() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    currentDateElement.textContent = today.toLocaleDateString(undefined, options);
}

function renderTasks() {
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;

        li.innerHTML = `
            <span>${task.text}</span>
            <button class="complete-btn">
                <i class="fas fa-check-circle"></i> <!-- Always show completed icon -->
            </button>
            <button class="delete-btn">
                <i class="fas fa-trash-alt"></i>
            </button>
        `;

        li.querySelector('.complete-btn').addEventListener('click', () => {
            if (!task.completed) {
                toggleComplete(index);
                showToast('Task Completed!');
            }
        });

        li.querySelector('.delete-btn').addEventListener('click', () => {
            deleteTask(index);
            showToast('Task Deleted!');
        });

        taskList.appendChild(li);
    });
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}

function addTasks() {
    const taskTexts = taskInput.value.split(',').map(task => task.trim()).filter(task => task !== '');
    if (taskTexts.length === 0) return;

    taskTexts.forEach(taskText => {
        tasks.unshift({ text: taskText, completed: false });
    });

    saveTasks();
    renderTasks();
    taskInput.value = '';
}

function toggleComplete(index) {
    tasks[index].completed = true;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

addTaskBtn.addEventListener('click', addTasks);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTasks();
});

updateCalendar();
renderTasks();
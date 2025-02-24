document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    let tasks = [];

    loadTasks();

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });


    function addTask() {
        const taskText = taskInput.value.trim();
        const priority = prioritySelect.value;

        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        const newTask = {
            id: Date.now(),
            text: taskText,
            priority: priority,
            completed: false
        };

        tasks.push(newTask);
        renderTasks();
        saveTasks();
        taskInput.value = '';
    }


    function renderTasks() {
        taskList.innerHTML = '';

        tasks.sort((a, b) => {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        });

        tasks.forEach(task => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item', task.priority);
            if (task.completed) {
                listItem.classList.add('completed');
            }

            listItem.innerHTML = `
                <span>${task.text}</span>
                <div class="task-actions">
                    <button class="complete-btn" data-id="${task.id}"><i class="fas fa-check"></i></button>
                    <button class="delete-btn" data-id="${task.id}"><i class="fas fa-trash"></i></button>
                    <button class="up-btn" data-id="${task.id}"><i class="fas fa-arrow-up"></i></button>
                    <button class="down-btn" data-id="${task.id}"><i class="fas fa-arrow-down"></i></button>
                </div>
            `;
            taskList.appendChild(listItem);

            listItem.querySelector('.complete-btn').addEventListener('click', toggleComplete);
            listItem.querySelector('.delete-btn').addEventListener('click', deleteTask);
            listItem.querySelector('.up-btn').addEventListener('click', moveTaskUp);
            listItem.querySelector('.down-btn').addEventListener('click', moveTaskDown);
        });
    }


    function toggleComplete(event) {
        const taskId = parseInt(event.currentTarget.dataset.id);
        tasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        renderTasks();
        saveTasks();
    }

    function deleteTask(event) {
        const taskId = parseInt(event.currentTarget.dataset.id);
        tasks = tasks.filter(task => task.id !== taskId);
        renderTasks();
        saveTasks();
    }

    function moveTaskUp(event) {
        const taskId = parseInt(event.currentTarget.dataset.id);
        const index = tasks.findIndex(task => task.id === taskId);

        if (index > 0) {
            [tasks[index], tasks[index - 1]] = [tasks[index - 1], tasks[index]];
            renderTasks();
            saveTasks();
        }
    }

    function moveTaskDown(event) {
        const taskId = parseInt(event.currentTarget.dataset.id);
        const index = tasks.findIndex(task => task.id === taskId);

        if (index < tasks.length - 1) {
            [tasks[index], tasks[index + 1]] = [tasks[index + 1], tasks[index]];
            renderTasks();
            saveTasks();
        }
    }


    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
            renderTasks();
        }
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
                <div class="buttons">
                    <button class="complete-btn">${task.completed ? 'Undo' : 'Done'}</button>
                    <button class="delete-btn">Delete</button>
                    <button class="up-btn">↑</button>
                    <button class="down-btn">↓</button>
                </div>
            `;

            const completeBtn = li.querySelector('.complete-btn');
            const deleteBtn = li.querySelector('.delete-btn');
            const upBtn = li.querySelector('.up-btn');
            const downBtn = li.querySelector('.down-btn');
            const taskText = li.querySelector('.task-text');

            completeBtn.addEventListener('click', () => toggleComplete(index));
            deleteBtn.addEventListener('click', () => deleteTask(index));
            upBtn.addEventListener('click', () => moveTask(index, -1));
            downBtn.addEventListener('click', () => moveTask(index, 1));
            taskText.addEventListener('click', () => toggleComplete(index));

            taskList.appendChild(li);
        });
    }

    function addTask() {
        const text = taskInput.value.trim();
        if (text) {
            tasks.push({ text, completed: false });
            taskInput.value = '';
            updateLocalStorage();
            renderTasks();
        }
    }

    function toggleComplete(index) {
        tasks[index].completed = !tasks[index].completed;
        updateLocalStorage();
        renderTasks();
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        updateLocalStorage();
        renderTasks();
    }

    function moveTask(index, direction) {
        if (index + direction < 0 || index + direction >= tasks.length) return;

        const temp = tasks[index];
        tasks[index] = tasks[index + direction];
        tasks[index + direction] = temp;

        updateLocalStorage();
        renderTasks();
    }

    function updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    renderTasks();
});
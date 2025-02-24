document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    renderTasks();

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }    
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const newTask = {
                text: taskText,
                completed: false,
                priority: 'normal'
            };
            tasks.push(newTask);
            saveTasks();
            renderTasks();
            taskInput.value = '';
        }
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item');
            if (task.completed) {
                listItem.classList.add('completed');
            }

            const taskTextSpan = document.createElement('span');
            taskTextSpan.classList.add('task-text');
            taskTextSpan.textContent = task.text;
            listItem.appendChild(taskTextSpan);

            const taskActions = document.createElement('div');
            taskActions.classList.add('task-actions');

            const completeBtn = document.createElement('button');
            completeBtn.classList.add('complete-btn');
            completeBtn.innerHTML = task.completed ? '<i class="fas fa-undo"></i>' : '<i class="fas fa-check"></i>';
            completeBtn.addEventListener('click', () => toggleComplete(index));
            taskActions.appendChild(completeBtn);

            const priorityBtn = document.createElement('button');
            priorityBtn.classList.add('priority-btn');
            priorityBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
            if (task.priority === 'high') {
                priorityBtn.classList.add('high-priority');
            }
            priorityBtn.addEventListener('click', () => togglePriority(index));
            taskActions.appendChild(priorityBtn);

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
            deleteBtn.addEventListener('click', () => deleteTask(index));
            taskActions.appendChild(deleteBtn);

            listItem.appendChild(taskActions);
            taskList.appendChild(listItem);
        });
    }

    function toggleComplete(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    function togglePriority(index) {
        tasks[index].priority = tasks[index].priority === 'normal' ? 'high' : 'normal';
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
});
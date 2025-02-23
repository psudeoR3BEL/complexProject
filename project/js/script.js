document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    addTaskBtn.addEventListener('click', addTask);

    taskList.addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON') {
            deleteTask(event.target.closest('li')); // Use closest for better compatibility
        } else if (event.target.tagName === 'LI') {
            toggleComplete(event.target);
        }
    });

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const listItem = document.createElement('li');
            listItem.classList.add('list-group-item'); // Add Bootstrap class
            listItem.textContent = taskText;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('btn', 'btn-danger', 'ml-2'); // Add Bootstrap classes

            listItem.appendChild(deleteButton);
            taskList.appendChild(listItem);
            taskInput.value = '';
        }
    }


    function deleteTask(taskItem) {
        if (taskItem) { // Check if taskItem exists
            taskList.removeChild(taskItem);
        }
    }

    function toggleComplete(taskItem) {
        taskItem.classList.toggle('completed');
    }

    // Particles.js initialization
    particlesJS.load('particles-js', 'particles.json', function() {
        console.log('callback - particles.js config loaded');
    });
});
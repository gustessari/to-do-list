// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.getElementById('add-task');
    const taskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');

    // Loading tasks
    loadTasks();
    
    // Add a new task
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
            // Clear the input field
        }
    }
    );

    // Function to create a new task element
    function addTask(taskText, completed=false) {
        const taskItem = document.createElement('li');

        const taskContent = document.createElement('span');
        taskContent.textContent = taskText;
        taskItem.appendChild(taskContent);

        // container icons
        const divIcon = document.createElement('div');
        divIcon.classList.add('div-icons')
        taskItem.appendChild(divIcon)

         // Create edit button
        const editIcon = document.createElement('i');
        editIcon.classList.add('edit-icon', "fa-solid", "fa-pen-to-square");
        divIcon.appendChild(editIcon);

        // Create delete button
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('delete-icon', 'fa-solid', 'fa-trash');
        divIcon.appendChild(deleteIcon);

        // Mark task as completed on click
        taskContent.addEventListener('click', () => {
            taskContent.classList.toggle('completed');
            saveTasks();
        }
        );

        // Delete the task on button click
        deleteIcon.addEventListener('click', () => {
            taskList.removeChild(taskItem);
            saveTasks();
        }
        );

        // Edit the task on button click
        editIcon.addEventListener('click', () => {
            editTask(taskItem)
            saveTasks();
        });

        if (completed) {
            taskContent.classList.add('completed');
        }

        // Append the task item to the list
        taskList.appendChild(taskItem);
        saveTasks();
    }

    // Add task when press Enter
    taskInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText !== '') {
                addTask(taskText);
                taskInput.value = '';
            }
        }
    }
    );

    // Save tasks to local storage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('span').forEach(taskItem => {
            tasks.push({
                text: taskItem.textContent,
                completed: taskItem.classList.contains('completed')
            });
        }
        );
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from local storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTask(task.text, task.completed);
        }
        );
    }

    function editTask(taskElement) {
        const taskText = taskElement.querySelector('span').textContent;
        const newTaskText = prompt('Edit your task:', taskText);
        if (newTaskText) {
            taskElement.querySelector('span').textContent = newTaskText;
        }
    }

}
);

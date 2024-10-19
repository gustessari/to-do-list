// Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  const addTaskButton = document.getElementById('add-task');
  const taskInput = document.getElementById('new-task');
  const taskList = document.getElementById('task-list');

  // Add a new task
  addTaskButton.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
          addTask(taskText);
          taskInput.value = ''; // Clear the input field
      }
  });

  // Function to create a new task element
  function addTask(taskText) {
      const taskItem = document.createElement('li');

      const taskContent = document.createElement('span');
      taskContent.textContent = taskText;
      taskItem.appendChild(taskContent);

      // Create delete button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('delete-btn');
      taskItem.appendChild(deleteButton);

      // Mark task as completed on click
      taskContent.addEventListener('click', () => {
          taskItem.classList.toggle('completed');
      });

      // Delete the task on button click
      deleteButton.addEventListener('click', () => {
          taskList.removeChild(taskItem);
      });

      // Append the task item to the list
      taskList.appendChild(taskItem);
  }

  taskInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    }
});
});

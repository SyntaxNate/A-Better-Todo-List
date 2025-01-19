const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

//Load tasks from Local Storage when the page loads//
document.addEventListener('DOMContentLoaded', () => {
    const savedTask = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTask.forEach(task => createTaskElement(task));
});
// Function to create a task element (list item)//
    function createTaskElement(task) {
        const li = document.createElement('li');
        li.textContent = task.text;
        // If the task is marked as completed, apply the 'completed' class from css//
            if(task.completed) {
                li.classList.add('completed');
            }

        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Check';
    // Toggle the 'completed' state//
        completeBtn.addEventListener('click', () => {
            li.classList.toggle('completed');
        // Save the updated state//
            saveTasksToLocalStorage();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';

        deleteBtn.addEventListener('click', () => {
            li.remove();// removes the task //

            saveTasksToLocalStorage();// save the updated state once again //
        });

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';

        editBtn.addEventListener('click', () => {
            const newTask = prompt('Edit Task:', li.textContent);
                if(newTask !== null && newTask.trim() !=="") {
                    li.textContent = newTask.trim();

            // reattach the buttons //
                li.appendChild(deleteBtn);
                li.appendChild(editBtn);
                li.appendChild(completeBtn);

                saveTasksToLocalStorage();// save the updated state once again //

                }
                
        });

        li.appendChild(deleteBtn);
        li.appendChild(editBtn);
        li.appendChild(completeBtn);
        taskList.appendChild(li);
        
    }
// Function to save tasks to local storage //
    function saveTasksToLocalStorage() {
        const tasks = [];

        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({text: li.firstChild.textContent.trim(), // show the task text //
                completed: li.classList.contains('completed') // show completed state //
            });
        });

    // save tasks as a JSON string //
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

        addTaskBtn.addEventListener('click', () => {
            const taskText = taskInput.value.trim();
            if(taskText !=="") {
                const newTask = {
                    text: taskText, completed: false // Create a new task object //
                };

                createTaskElement(newTask); // Add a new task object //
                saveTasksToLocalStorage(); // Save the updated task list //

                taskInput.value =""; // Lastly clear the input field //
            }
        });
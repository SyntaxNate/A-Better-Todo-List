const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

document.addEventListener('DOMContentLoaded', () => {
    const savedTask = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTask.forEach(task => createTaskElement(task));
});

    function createTaskElement(task) {
        const li = document.createElement('li');
        li.textContent = task.text;
            if(task.completed) {
                li.classList.add('completed');
            }

        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Check';

        completeBtn.addEventListener('click', () => {
            li.classList.toggle('completed');

            saveTasksToLocalStorage();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';

        deleteBtn.addEventListener('click', () => {
            li.remove();

            saveTasksToLocalStorage();
        });

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';

        editBtn.addEventListener('click', () => {
            const newTask = prompt('Edit Task:', li.textContent);
                if(newTask !== null && newTask.trim() !=="") {
                    li.textContent = newTask.trim();

                li.appendChild(deleteBtn);
                li.appendChild(editBtn);
                li.appendChild(completeBtn);

                saveTasksToLocalStorage();

                }
                
        });

        li.appendChild(deleteBtn);
        li.appendChild(editBtn);
        li.appendChild(completeBtn);
        taskList.appendChild(li);
        
    }

    function saveTasksToLocalStorage() {
        const tasks = [];

        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({text: li.firstChild.textContent.trim(), completed:
                li.classList.contains('completed')
            });
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

        addTaskBtn.addEventListener('click', () => {
            const taskText = taskInput.value.trim();
            if(taskText !=="") {
                const newTask = {
                    text: taskText, completed: false
                };

                createTaskElement(newTask);
                saveTasksToLocalStorage();

                taskInput.value ="";
            }
        });
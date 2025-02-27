
        // Get DOM elements
        const taskInput = document.getElementById('task-input');
        const taskList = document.getElementById('task-list');

        // Load tasks from local storage
        let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Function to render tasks
        function renderTasks() {
            taskList.innerHTML = '';
            tasks.forEach((task, index) => {
                const li = document.createElement('li');
                li.classList.add('task-item');
                if (task.completed) {
                    li.classList.add('completed');
                }
                
                li.innerHTML = `
                    <span>${task.text}</span>
                    <div>
                        <button class="edit" onclick="editTask(${index})">Edit</button>
                        <button class="delete"onclick="deleteTask(${index})">Delete</button>
                        <button class="complete"onclick="toggleComplete(${index})">${task.completed ? 'Done' : 'Pending'}</button>
                    </div>
                `;
                taskList.appendChild(li);
            });
        }

        // Add task function
        function addTask() {
            const taskText = taskInput.value.trim();
            if (taskText === '') return;

            const newTask = {
                text: taskText,
                completed: false
            };
            tasks.push(newTask);
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }

        // Edit task function
        function editTask(index) {
            const newTaskText = prompt('Edit your task:', tasks[index].text);
            if (newTaskText !== null && newTaskText.trim() !== '') {
                tasks[index].text = newTaskText.trim();
                saveTasks();
                renderTasks();
            }
        }

        // Delete task function
        function deleteTask(index) {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        }

        // Toggle task completion status
        function toggleComplete(index) {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        }

        // Save tasks to local storage
        function saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        // Initial render
        renderTasks();
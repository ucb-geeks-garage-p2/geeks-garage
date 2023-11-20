document.addEventListener('DOMContentLoaded', () => {
    const createTaskButton = document.getElementById('createTaskButton');
    const createTaskModal = new bootstrap.Modal(document.getElementById('createTaskModal'));
    const createTaskButtonModal = document.getElementById('createTaskButtonModal');
    const updateCarButton = document.getElementById('updateCarButton');
    const deleteButtons = document.querySelectorAll('deleteTaskButton');


    const createTaskButtonModalHandler = async (event) => {
        event.preventDefault();
        event.stopPropagation(); // Prevent the event from reaching parent elements

        console.log('createTaskForm hit');

        const taskName = document.getElementById('taskName').value.trim();
        const createdOn = Date.now();
        const dueBy = document.getElementById('dueBy').value.trim();
        const carId = document.getElementById('carId').value.trim();

        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify({
                    task_name: taskName,
                    created_on: createdOn,
                    due_by: dueBy,
                    car_id: carId,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            createTaskModal.hide();

            if (response.ok) {
                console.log('New task created');
                // Handle success, e.g., show a success message or redirect to another page
                document.location.replace('/');
            } else {
                console.error('Failed to create task:', response.status, response.statusText);
                // Handle failure, e.g., show an error message to the user
            }
        } catch (error) {
            console.error('Error creating task:', error);
            // Handle unexpected errors
        }
    };

    if (deleteButtons) {
        deleteButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();

                const taskId = button.dataset.taskId;
                if (taskId) {
                    // Confirm deletion if needed
                    const confirmDeletion = confirm('Are you sure you want to delete this task?');
                    if (confirmDeletion) {
                        deleteTaskHandler(taskId);
                    }
                }
            });
        });
    }

    if (createTaskButton) {
        createTaskButton.addEventListener('click', () => {
            createTaskModal.show();
        });
    }

    if (createTaskButtonModal) {
        createTaskButtonModal.addEventListener('click', createTaskButtonModalHandler);
    }

    if (updateCarButton) {
        updateCarButton.addEventListener('click', () => {

        })
    }

});

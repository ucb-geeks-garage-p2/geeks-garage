 
// document.addEventListener('DOMContentLoaded', () => {
//     const createTaskButton = document.getElementById('createTaskButton');
//     const createTaskModal = new bootstrap.Modal(document.getElementById('createTaskModal'));
//     const createTaskButtonModal = document.getElementById('createTaskButtonModal');
//     const createTaskForm = document.querySelector('#createTaskModal form');

//     const createTaskButtonModalHandler = async (event) => {
//         event.preventDefault();
//         event.stopPropagation(); // Prevent the event from reaching parent elements

//         console.log('createTaskForm hit');

//         const taskName = document.getElementById('taskName').value.trim();
//         const createdOn = Date.now();
//         const dueBy = document.getElementById('dueBy').value.trim();
//         const carId = document.getElementById('carId').value.trim();

//         try {
//             const response = await fetch('/', {
//                 method: 'POST',
//                 body: JSON.stringify({
//                     task_name: taskName,
//                     created_on: createdOn,
//                     due_by: dueBy,
//                     car_id: carId,
//                 }),
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             });

//             createTaskModal.hide();

//             if (response.ok) {
//                 console.log('New task created');
//                 // Handle success, e.g., show a success message or redirect to another page
//                 document.location.replace('/');
//             } else {
//                 console.error('Failed to create task:', response.status, response.statusText);
//                 // Handle failure, e.g., show an error message to the user
//             }
//         } catch (error) {
//             console.error('Error creating task:', error);
//             // Handle unexpected errors
//         }
//     };

//     if (createTaskButton) {
//         createTaskButton.addEventListener('click', () => {
//             createTaskModal.show();
//         });
//     }

//     if (createTaskButtonModal) {
//         createTaskButtonModal.removeEventListener('click', createTaskButtonModalHandler);
//         createTaskButtonModal.addEventListener('click', createTaskButtonModalHandler);
//     }
// });

document.addEventListener('DOMContentLoaded', () => {
    const createTaskButton = document.getElementById('createTaskButton');
    const createTaskModal = new bootstrap.Modal(document.getElementById('createTaskModal'));
    const createTaskButtonModal = document.getElementById('createTaskButtonModal');
    const createTaskForm = document.querySelector('#createTaskModal form');

    const createTaskButtonModalHandler = async (event) => {
        event.preventDefault();
        event.stopPropagation(); // Prevent the event from reaching parent elements

        console.log('createTaskForm hit');

        const taskName = document.getElementById('taskName').value.trim();
        const createdOn = Date.now();
        const dueBy = document.getElementById('dueBy').value.trim();
        const carId = document.getElementById('carId').value.trim();

        try {
            const response = await fetch('/', {
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

    const deleteTaskHandler = async (taskId) => {
        try {
            const response = await fetch(`/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log(`Task ${taskId} deleted`);
                // Reload the page or update the UI as needed
                location.reload();
            } else {
                console.error(`Failed to delete task ${taskId}`, response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    // Add event listeners for delete buttons within each task div
    const deleteButtons = document.querySelectorAll('deleteTaskButton');
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

    const completeTaskHandler = async (taskId) => {
        try {
            const response = await fetch(`/api/tasks/${taskId}/complete`, {
                method: 'PUT',  // Assuming you use a PUT request to mark a task as complete
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                console.log(`Task ${taskId} marked as complete`);
                // Reload the page or update the UI as needed
                location.reload();
            } else {
                console.error(`Failed to complete task ${taskId}`, response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error completing task:', error);
        }
    };

    // Event listener for "Complete Task" button
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('completeTaskButton')) {
            const taskId = event.target.dataset.taskId;
            completeTaskHandler(taskId);
        }
    });

    // Event listener for "Delete Task" button
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('deleteTaskButton')) {
            const taskId = event.target.dataset.taskId;
            deleteTaskHandler(taskId);
        }
    });

    if (createTaskButton) {
        createTaskButton.addEventListener('click', () => {
            createTaskModal.show();
        });
    }

    if (createTaskButtonModal) {
        createTaskButtonModal.removeEventListener('click', createTaskButtonModalHandler);
        createTaskButtonModal.addEventListener('click', createTaskButtonModalHandler);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const createTaskButton = document.getElementById('createTaskButton');
    const createTaskModal = new bootstrap.Modal(document.getElementById('createTaskModal'));
    const createTaskButtonModal = document.getElementById('createTaskButtonModal');
    const updateCarButton = document.getElementById('updateCarButton');
    const updateCarModal = new bootstrap.Modal(document.getElementById('updateCarModal'));
    const updateCarButtonModal = document.getElementById('updateCarButtonModal');
    const deleteButtons = document.querySelectorAll('.deleteTaskButton');


    const createTaskButtonModalHandler = async (event) => {
        event.preventDefault();
        event.stopPropagation(); // Prevent the event from reaching parent elements
    
        console.log('createTaskForm hit');
    
        const taskName = document.getElementById('taskName').value.trim();
        const createdOn = Date.now();
        const dueByInput = new Date(document.getElementById('dueBy').value.trim()) || null;
        const carId = document.getElementById('carInfoStore').dataset.carid;
    
        // Convert dueByInput to UTC epoch timestamp
        // let dueBy;
        // if (dueByInput) {
        //     const [month, day, year] = dueByInput.split('-');
        //     const utcDueDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
        //     // Convert to seconds and floor the value directly
        //     dueBy = Math.floor(utcDueDate.getTime() / 1000).toString();
        // } else {
        //     dueBy = null;
        // }

        let dueBy;
        if (dueByInput) {
            dueBy = dueByInput.getTime();
        } else {
            dueBy = null;
        }
    
        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify({
                    task_name: taskName,
                    created_on: createdOn,
                    due_by: dueBy,
                    // due_by: dueByInput,
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
                document.location.replace(`/api/cars/${carId}`);
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

        const carId = document.getElementById('carInfoStore').dataset.carid;

        try {
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log(`Task ${taskId} deleted`);
                // Reload the page or update the UI as needed
                document.location.replace(`/api/cars/${carId}`);
            } else {
                console.error(`Failed to delete task ${taskId}`, response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    
    const updateCarButtonModalHandler = async (event) => {
        event.preventDefault();
        event.stopPropagation(); // Prevent the event from reaching parent elements

        console.log('updateCarForm hit');

        const make = document.getElementById('carMake').value.trim() || null;
        const model = document.getElementById('carModel').value.trim() || null;
        const year = document.getElementById('carYear').value.trim() || null;
        const mileage = document.getElementById('carMileage').value.trim() || null;
        const carId = document.getElementById('carInfoStore').dataset.carid;

        try {
            const response = await fetch(`/api/cars/${carId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    make,
                    model,
                    year,
                    mileage,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            updateCarModal.hide();

            if (response.ok) {
                console.log('car was updated');
                // Handle success, e.g., show a success message or redirect to another page
                document.location.replace(`/api/cars/${carId}`);
            } else {
                console.error('Failed to update car:', response.status, response.statusText);
                // Handle failure, e.g., show an error message to the user
            }
        } catch (error) {
            console.error('Error updating car:', error);
            // Handle unexpected errors
        }
    };


    if (deleteButtons) {
        deleteButtons.forEach((button) => {
            button.addEventListener('click', async (event) => {
                event.preventDefault();
                event.stopPropagation();
                
                const taskId = button.dataset.taskid;
                // console.log('attempting to delete', taskId);
                if (taskId) {
                    // Confirm deletion if needed
                    const confirmDeletion = confirm('Are you sure you want to delete this task?');
                    if (confirmDeletion) {
                        await deleteTaskHandler(taskId);
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
            updateCarModal.show();
        })
    }

    if (updateCarButtonModal) {
        updateCarButtonModal.addEventListener('click', updateCarButtonModalHandler);
    }

});

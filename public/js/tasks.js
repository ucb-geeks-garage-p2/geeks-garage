document.addEventListener('DOMContentLoaded', () => {
    const createTaskButton = document.getElementById('createTaskButton');
    const createTaskModal = new bootstrap.Modal(document.getElementById('createTaskModal'));
    const createTaskForm = document.getElementById('createTaskForm');
  
    if (createTaskButton) {
      createTaskButton.addEventListener('click', () => {
        createTaskModal.show();
      });
    }
  
    if (createTaskForm) {
      createTaskForm.addEventListener('submit', async (event) => {
        event.preventDefault();
  
        const taskName = document.getElementById('taskNameInput').value.trim();
        const createdOn = Date.now();
        const dueBy = document.getElementById('dueByInput').value.trim();
        const carId = document.getElementById('carIdInput').value.trim();
  
        try {
          const response = await fetch('/tasks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              task_name: taskName,
              created_on: createdOn,
              due_by: dueBy,
              car_id: carId,
            }),
          });
  
          if (response.ok) {
            const newTask = await response.json();
            console.log('New task created:', newTask);
            // Handle success, e.g., show a success message or redirect to another page
            createTaskModal.hide(); // Hide the modal after successful creation
          } else {
            console.error('Failed to create task:', response.status, response.statusText);
            // Handle failure, e.g., show an error message to the user
          }
        } catch (error) {
          console.error('Error creating task:', error);
          // Handle unexpected errors
        }
      });
    }
  });
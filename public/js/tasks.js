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
      });
    }
  });
  
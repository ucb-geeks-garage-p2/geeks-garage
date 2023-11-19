document.addEventListener('DOMContentLoaded', () => {
    const createTaskButton = document.getElementById('createTaskButton'); // Change 'createTaskButton' to the actual ID of your button
  
    if (createTaskButton) {
      createTaskButton.addEventListener('click', async () => {
        try {
          // Collect task data from the user input (adjust as needed)
          const taskName = document.getElementById('taskNameInput').value;
          const createdOn = Date.now(); // Assuming you want to set the creation time on the client side
          const dueBy = document.getElementById('dueByInput').value;
          const carId = document.getElementById('carIdInput').value;
  
          // Send a POST request to create a new task
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
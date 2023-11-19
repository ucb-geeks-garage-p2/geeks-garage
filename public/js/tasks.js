document.addEventListener('DOMContentLoaded', () => {
  const createTaskButton = document.getElementById('createTaskButton');
  const createTaskModal = new bootstrap.Modal(document.getElementById('createTaskModal'));
  const createTaskForm = document.getElementById('createTaskForm');
  const carIdInput = document.getElementById('carId'); // Assuming the ID of the carId input field

  if (createTaskButton) {
    createTaskButton.addEventListener('click', () => {
      // Get the id of the first car in the array
      const firstCarIdElement = document.querySelector('ul li:first-child .car-id-input');
      if (firstCarIdElement) {
        const firstCarId = firstCarIdElement.innerText.trim();
        // carIdInput.value = firstCarId; // Remove this line to prevent setting the value in the input field
      }

      // Show the modal
      createTaskModal.show();
    });
  }

  if (createTaskForm) {
    createTaskForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const taskName = document.getElementById('taskName').value.trim();
      const createdOn = Date.now();
      const dueBy = document.getElementById('dueBy').value.trim();
      const carId = document.getElementById('carId').value.trim(); // This will still send the value in the request

      try {
        const response = await fetch('/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            task_name: taskName,
            created_on: createdOn,
            due_by: dueBy,
            car_id: carId, // This value will be sent in the request
          }),
        });

        if (response.ok) {
        //   const newTask = await response.json();
        document.location.replace('/');
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

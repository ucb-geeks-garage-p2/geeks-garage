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

  if (createTaskButton) {
      createTaskButton.addEventListener('click', () => {
          createTaskModal.show();
      });
  }

  if (createTaskButtonModal) {
      createTaskButtonModal.onclick = createTaskButtonModalHandler;
  }
});
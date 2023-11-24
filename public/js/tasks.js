
document.addEventListener('DOMContentLoaded', () => {
  const createTaskButton = document.getElementById('createTaskButton');
  const createTaskModal = new bootstrap.Modal(document.getElementById('createTaskModal'));
  const createTaskButtonModal = document.getElementById('createTaskButtonModal');
  const createTaskForm = document.querySelector('#createTaskModal form');

  const convertDateToEpochString = (dateString) => {
    return new Promise((resolve, reject) => {
      try {
        const [month, day, year] = dateString.split('-');
        const dueByNum = Date.parse(`${year}-${month}-${day}`);
        const dueByEpoch = dueByNum.toString();
        resolve(dueByEpoch);
      } catch (error) {
        reject(error);
      }
    });
  };

  const createTaskButtonModalHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const taskName = document.getElementById('taskName').value.trim();
    const createdOn = Date.now();
    const carId = document.getElementById('carId').value.trim();
    const dueByInput = document.getElementById('dueBy').value.trim();
    console.log(dueByInput);
    //for created on 


    // convertDateToEpochString(dueByInput)
    //   .then((dueByEpoch) => {
    //     return fetch('/', {
    //       method: 'POST',
    //       body: JSON.stringify({
    //         task_name: taskName,
    //         created_on: createdOn,
    //         due_by: dueByEpoch,
    //         car_id: carId,
    //       }),
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     });
    //   })
    //   .then((response) => {
    //     createTaskModal.hide();

    //     if (response.ok) {
    //       console.log('New task created');
    //       document.location.replace('/');
    //     } else {
    //       console.error('Failed to create task:', response.status, response.statusText);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error('Error creating task:', error);
    //   });

    try {
      // const dueByEpoch = await convertDateToEpochString(dueByInput);
      const dueByEpoch = dueByInput;

      const response = await fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify({
          task_name: taskName,
          created_on: createdOn,
          due_by: dueByEpoch,
          car_id: carId,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      createTaskModal.hide();

      if (response.ok) {
        console.log('New task created');
        document.location.replace(`/api/cars/${carId}`);
      } else {
        console.error('Failed to create task:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error creating task:', error);
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
  // document.addEventListener('click', (event) => {
  //     if (event.target.classList.contains('deleteTaskButton')) {
  //         const taskId = event.target.dataset.taskId;
  //         deleteTask(taskId);
  //     }
  // });

  if (createTaskButton) {
    createTaskButton.addEventListener('click', () => {
      createTaskModal.show();
    });
  }

  if (createTaskButtonModal) {
    //   createTaskButtonModal.removeEventListener('click', createTaskButtonModalHandler);
    createTaskButtonModal.addEventListener('click', createTaskButtonModalHandler);
  }
});

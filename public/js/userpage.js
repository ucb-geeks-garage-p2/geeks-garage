document.addEventListener('DOMContentLoaded', () => {
    const createCarButton = document.getElementById('createCarButton');
    const createCarModal = new bootstrap.Modal(document.getElementById('createCarModal'));
    const createCarButtonModal = document.getElementById('createCarButtonModal');
    const deleteButtons = document.querySelectorAll('.deleteCarButton');

    const createCarButtonModalHandler = async (event) => {
        event.preventDefault();
        event.stopPropagation(); // Prevent the event from reaching parent elements

        console.log('createCarForm hit');

        const make = document.getElementById('carMake').value.trim();
        const model = document.getElementById('carModel').value.trim();
        const year = document.getElementById('carYear').value.trim() || null;
        const mileage = document.getElementById('carMileage').value.trim() || null;
        const user_id = document.getElementById('carInfoStore').dataset.userid;

        try {
            const response = await fetch(`/api/cars`, {
                method: 'POST',
                body: JSON.stringify({
                    make,
                    model,
                    year,
                    mileage,
                    user_id
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            createCarModal.hide();

            if (response.ok) {
                console.log('car was create');
                // Handle success, e.g., show a success message or redirect to another page
                document.location.replace(`/`);
            } else {
                console.error('Failed to create car:', response.status, response.statusText);
                // Handle failure, e.g., show an error message to the user
            }
        } catch (error) {
            console.error('Error creating car:', error);
            // Handle unexpected errors
        }
    };

    const deleteCarHandler = async (carid) => {

        try {
            const response = await fetch(`/api/cars/${carid}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Reload the page or update the UI as needed
                document.location.replace(`/`);
                console.log(`Car ${carid} deleted`);
            } else {
                console.error(`Failed to delete car ${carid}`, response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    };

    if (deleteButtons) {
        deleteButtons.forEach((button) => {
            button.addEventListener('click', async (event) => {
                event.preventDefault();
                event.stopPropagation();

                const carid = button.dataset.carid;
                // console.log('attempting to delete', carid);
                if (carid) {
                    // Confirm deletion if needed
                    const confirmDeletion = confirm('Are you sure you want to delete this car?');
                    if (confirmDeletion) {
                        await deleteCarHandler(carid);
                    }
                }
            });
        });
    }

    if (createCarButton) {
        createCarButton.addEventListener('click', () => {
            createCarModal.show();
        });
    }

    if (createCarButtonModal) {
        createCarButtonModal.addEventListener('click', createCarButtonModalHandler);
    }



});
//placeholder function that needs to be modified when i get home

document.addEventListener('DOMContentLoaded', () => {
    const createCarButton = document.getElementById('createCarButton');
    const deleteCarButton = document.getElementById('deleteCarButton');

    const createCarHandler = async () => {
        const make = prompt('Enter car make:');
        const model = prompt('Enter car model:');
        const year = prompt('Enter car year:');
        const mileage = prompt('Enter car mileage:');
        const user_id = prompt('Enter user ID:');

        try {
            const response = await fetch('/api/cars', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ make, model, year, mileage, user_id }),
            });

            if (response.ok) {
                console.log('New car created');
                // Handle success, e.g., show a success message or update the UI
            } else {
                console.error('Failed to create car:', response.status, response.statusText);
                // Handle failure, e.g., show an error message to the user
            }
        } catch (error) {
            console.error('Error creating car:', error);
            // Handle unexpected errors
        }
    };

    const deleteCarHandler = async () => {
        const carIdToDelete = prompt('Enter car ID to delete:');

        try {
            const response = await fetch(`/api/cars/${carIdToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                console.log(`Car ${carIdToDelete} deleted`);
                // Handle success, e.g., show a success message or update the UI
            } else {
                console.error(`Failed to delete car ${carIdToDelete}`, response.status, response.statusText);
                // Handle failure, e.g., show an error message to the user
            }
        } catch (error) {
            console.error('Error deleting car:', error);
            // Handle unexpected errors
        }
    };

    if (createCarButton) {
        createCarButton.addEventListener('click', createCarHandler);
    }

    if (deleteCarButton) {
        deleteCarButton.addEventListener('click', deleteCarHandler);
    }
});
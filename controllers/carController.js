const express = require('express');
const router = express.Router();
const { Car } = require('../models');

// Get all cars
router.get('/', async (req, res) => {
    try {
        const cars = await Car.findAll();
        res.json(cars);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a single car by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const car = await Car.findByPk(id);
        if (!car) {
            res.status(404).json({ error: 'Car not found' });
        } else {
            res.json(car);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create a new car
router.post('/', async (req, res) => {
    const { make, model, mileage, user_id } = req.body;
    try {
        const newCar = await Car.create({ make, model, mileage, user_id });
        res.status(201).json(newCar);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a car by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { make, model, mileage, user_id } = req.body;
    try {
        const updatedCar = await Car.update(
            { make, model, mileage, user_id },
            { where: { id }, returning: true }
        );
        if (updatedCar[0] === 0) {
            res.status(404).json({ error: 'Car not found' });
        } else {
            res.json(updatedCar[1][0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a car by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCar = await Car.destroy({ where: { id } });
        if (deletedCar === 0) {
            res.status(404).json({ error: 'Car not found' });
        } else {
            res.json({ message: 'Car deleted successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { Task } = require('../models');

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a single task by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findByPk(id);
        if (!task) {
            res.status(404).json({ error: 'Task not found' });
        } else {
            res.json(task);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create a new task
router.post('/', async (req, res) => {
    const { make, model, mileage, createdOn, dueBy, car_id } = req.body;
    try {
        const newTask = await Task.create({ make, model, mileage, createdOn, dueBy, car_id });
        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a task by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { make, model, mileage, createdOn, dueBy, car_id } = req.body;
    try {
        const updatedTask = await Task.update(
            { make, model, mileage, createdOn, dueBy, car_id },
            { where: { id }, returning: true }
        );
        if (updatedTask[0] === 0) {
            res.status(404).json({ error: 'Task not found' });
        } else {
            res.json(updatedTask[1][0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a task by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await Task.destroy({ where: { id } });
        if (deletedTask === 0) {
            res.status(404).json({ error: 'Task not found' });
        } else {
            res.json({ message: 'Task deleted successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

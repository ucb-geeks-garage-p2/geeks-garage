const express = require('express');
const router = express.Router();
const { User } = require('../models');

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json(user);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create a new user
router.post('/', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const newUser = await User.create({ username, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;
    try {
        const updatedUser = await User.update(
            { username, email, password },
            { where: { id }, returning: true }
        );
        if (updatedUser[0] === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json(updatedUser[1][0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.destroy({ where: { id } });
        if (deletedUser === 0) {
            res.status(404).json({ error: 'User not found' });
        } else {
            res.json({ message: 'User deleted successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

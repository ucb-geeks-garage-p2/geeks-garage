const express = require('express');
const router = express.Router();
const { Note } = require('../models');

// Get all notes
router.get('/', async (req, res) => {
    try {
        const notes = await Note.findAll();
        res.json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Get a single note by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const note = await Note.findByPk(id);
        if (!note) {
            res.status(404).json({ error: 'Note not found' });
        } else {
            res.json(note);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create a new note
router.post('/', async (req, res) => {
    const { description, task_id } = req.body;
    try {
        const newNote = await Note.create({ description, task_id });
        res.status(201).json(newNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a note by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { description, task_id } = req.body;
    try {
        const updatedNote = await Note.update(
            { description, task_id },
            { where: { id }, returning: true }
        );
        if (updatedNote[0] === 0) {
            res.status(404).json({ error: 'Note not found' });
        } else {
            res.json(updatedNote[1][0]);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Delete a note by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedNote = await Note.destroy({ where: { id } });
        if (deletedNote === 0) {
            res.status(404).json({ error: 'Note not found' });
        } else {
            res.json({ message: 'Note deleted successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

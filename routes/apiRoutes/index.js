const router = require('express').Router();
const userRoutes = require('./userRoutes');
const carRoutes = require('./carRoutes');
const taskRoutes = require('./taskRoutes');
const noteRoutes = require('./noteRoutes');

router.use('/users', userRoutes);
router.use('/cars', carRoutes);
router.use('/tasks', taskRoutes);
router.use('/notes', noteRoutes);

module.exports = router;
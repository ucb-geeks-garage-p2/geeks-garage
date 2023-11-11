const router = require('express').Router();
const carController = require('./carController');
const noteController = require('./noteController');
const taskController = require('./taskController');
const userController = require('./userController');

router.use('/cars', carController);
router.use('/notes', noteController);
router.use('/tasks', taskController);  
router.use('/users', userController);

module.exports = router;
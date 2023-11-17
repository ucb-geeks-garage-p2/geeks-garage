const router = require('express').Router();
const taskController = require('../../../controllers/taskController');


router.route('/')
    // .get(taskController.getTasks)
    .post(async (req, res) => {
        //add a task
    })

router.route('/:id')
    // .get()
    .put( async (req, res) => {
        //update a task
        
    })
    .delete(( async (req, res) => {
        //delete a task
        
    }));


module.exports = router;

const router = require('express').Router();
const taskController = require('../../../controllers/taskController');


router.route('/')
    .get(taskController.getTasks)
    .post()

router.route('/:id')
    .get()
    .put()
    .delete();


module.exports = router;

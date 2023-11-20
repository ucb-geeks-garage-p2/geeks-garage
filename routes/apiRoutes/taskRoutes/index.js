const router = require('express').Router();
const taskController = require('../../../controllers/taskController');


router.route('/')
    // .get(taskController.getTasks)
    .post(async (req, res) => {
        try {
          const { task_name, created_on, due_by, car_id } = req.body;
      
          const newTask = await taskController.createTask({
            task_name,
            created_on,
            due_by,
            car_id
          });
            res.status(200).json(newTask);
        } catch (err) {
          res.status(500).json(err);
        }
      });

router.route('/:id')
    // .get()
    .put( async (req, res) => {
        //update a task
        
    })
    .delete(( async (req, res) => {
        //delete a task
        try {
          const deletedTask = await taskController.deleteTask(req.params.id);
          res.status(200).json(deletedTask);
        } catch (err) {
          console.log(err);
          res.status(500).json(err);
        }

    }));


module.exports = router;

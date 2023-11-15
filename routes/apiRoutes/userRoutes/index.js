const router = require('express').Router();
// const {
    
// } = require('../../../controllers/userController');

const userController = require('../../../controllers/userController');
router.route('/')
    .get(userController.getUsersTasks)
    .post()

router.route('/:id')
    // .get(userController.getUsersAll)
    // .get(userController.getUserCarsByID)
    // .get(userController.getUserTasksByID)
    // .put(userController.updateUser)
    // .delete(userController.deleteUser);


module.exports = router;

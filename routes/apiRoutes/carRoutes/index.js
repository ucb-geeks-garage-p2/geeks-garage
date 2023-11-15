const router = require('express').Router();
const carController = require('../../../controllers/carController');


router.route('/')
    .get(carController.getCars)
    .post()

router.route('/:id')
    .get()
    .put()
    .delete();


module.exports = router;

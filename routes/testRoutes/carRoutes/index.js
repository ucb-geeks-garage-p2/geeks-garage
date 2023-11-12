const router = require('express').Router();
const {
    
} = require('../../../controllers/carController');


router.route('/')
    .get()
    .post()

router.route('/:id')
    .get()
    .put()
    .delete();


module.exports = router;

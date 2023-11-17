const router = require('express').Router();
const carController = require('../../../controllers/carController');


router.route('/')
    // .get()
    .post(async (req, res) => {
        
    })

router.route('/:id')
    .get(async (req, res) => {

    })
    .put(async (req, res) => {
        
    })
    .delete(async (req, res) => {
        
    });


module.exports = router;

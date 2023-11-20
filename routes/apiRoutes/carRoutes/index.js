const router = require('express').Router();
const carController = require('../../../controllers/carController');


router.route('/')
    // .get()
    .post(async (req, res) => {

    })

router.route('/:id')
    .get(async (req, res) => {
        if (req.session.loggedIn) {
            try {
                const carWithTasks = await carController.getCarTasksByID(req.params.id);
                console.log(carWithTasks, "--------car dataset here--------");
                const viewObj = {
                    logged_in: req.session.loggedIn,
                    carWithTasks,

                }
                res.render('car', viewObj);
            } catch (err) {
                console.log(err);
                res.redirect('/');
            }
        } else {
            res.redirect('/');
        }
    })
    .put(async (req, res) => {
        if (req.session.loggedIn) {
            try {
                const updatedCar = await carController.updateCar(req.params.id, req.body);
                console.log(updatedCar, "--------updated car dataset here--------");
                
                res.status(200).json(updatedCar);
            } catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
        } else {
            res.status(500).json(err);
        }
    })
    .delete(async (req, res) => {

    });


module.exports = router;

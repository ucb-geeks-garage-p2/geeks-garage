const router = require('express').Router();
const userController = require('../../../controllers/userController');

// router.get('/', getTodos);

router.route('/')
    // .get()
    .post(async (req, res) => {
        try {
            const user = await userController.createUser(req.body);
            console.log(user);


            req.session.save(() => {
                req.session.loggedIn = true;
                req.session.userId = user.id;
                console.log(
                    'File: user-routes.js ~ req.session.save ~ req.session.cookie',
                    req.session.cookie
                );

                req.session.lastView = 'home';
                req.session.lastMessage = 'You are now logged in!';
                req.session.failedSignUp = false;
                req.session.failedLogin = false;

                res.status(200).json(user);
            });
        } catch (err) {
            console.log(err);
            req.session.lastView = 'login';
            req.session.failedSignUp = true;
            req.session.failedLogin = false;
            res.status(500).json(err);
        }
    })

router.route('/:id')
    // .get()
    .put((req, res) => {
        const user = userController.updateUser(req.params.id, req.body);

    })


module.exports = router;

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
                req.session.userID = user.id;
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
    .put(async (req, res) => {

        if (req.session.loggedIn) {
            try {
                const updateUser = await userController.updateUser(req.session.userID, req.body);
                console.log(updateUser, "--------updated user dataset here--------");

                res.status(200).json(updateUser);
            } catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
        } else {
            res.status(500).json(err);
        }
    })

router.route('/update-password')
    // .get()
    .put(async (req, res) => {

        if (req.session.loggedIn) {
            try {
                const updatedPassword = await userController.updateUserPassword(req.session.userID, req.body);
                console.log(updatedPassword, "--------updated password dataset here--------");

                res.status(200).json(updatedPassword);
            } catch (err) {
                console.log(err);
                res.status(500).json(err);
            }
        } else {
            res.status(500).json(err);
        }
    })


router.get('/profile', async (req, res) => {
    if (req.session.loggedIn) {
        try {
            const userInfo = await userController.getUserByID(req.session.userID);
            console.log(userInfo, "=======user info here======");


            const viewObj = {
                logged_in: req.session.loggedIn,
                userInfo,

            }
            res.render('profile', viewObj);
        } catch (err) {
            console.log(err);
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
})

module.exports = router;

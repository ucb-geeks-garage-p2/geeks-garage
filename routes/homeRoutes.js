const router = require('express').Router();
const { userController } = require('../controllers');

router.get('/', async (req, res) => {
  if (req.session.loggedIn) {

    const usersWithCars = await userController.getUserCarsByID(req.session.userID);

    console.log(usersWithCars);

    res.render('userpage', {});
  } else {
    // console.log('************** not logged in *************');

    const loginObj = {
      message: req.session.lastMessage,
      isLogin: true,
      failedLogin: req.session.failedLogin,
      failedSignUp: req.session.failedSignUp
    }

    res.render('login-test', loginObj);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await userController.checkUserByEmail(req.body.email);

    if (!user) {
      req.session.lastMessage = "Incorrect email or password, please try again";
      res.render('login-test', { failedLogin: true, message: req.session.lastMessage });
      return;
    }

    const validPassword = await user.checkPassword(req.body.password);

    if (!validPassword) {
      req.session.lastMessage = "Incorrect email or password, please try again";
      res.render('login-test', { failedLogin: true, message: req.session.lastMessage });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userID = user.id;
      console.log(
        'File: user-routes.js ~ req.session.save ~ req.session.cookie',
        req.session.cookie
      );

      req.session.lastView = 'home';

      req.session.lastMessage = "your in the mainframe!";

      // console.log("---user logged in---");
      res.status(200).json(user);
    });
  } catch (err) {
    console.log(err);
    req.session.failedSignUp = false;
    req.session.failedLogin = true;
    res.status(500).json(err);
  }
})

router.post('/logout', async (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      // console.log("---user logged out---");
      res.render('login-test');
    });
  } else {
    res.render('login-test');
  }
})


router.get('/more/:id', async (req, res) => {

})



module.exports = router;
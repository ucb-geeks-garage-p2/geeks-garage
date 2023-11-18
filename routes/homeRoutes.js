const router = require('express').Router();
const { userController } = require('../controllers');

router.get('/', async (req, res) => {
  if (req.session.loggedIn) {

    const usersWithTasks = await userController.getUserCarsByID(req.session.userID);

    console.log(usersWithTasks);

    res.render('userpage', {  });
  }
  // console.log('************** not logged in *************');
  
  const loginObj = {
    message: req.session.lastMessage,
    isLogin: true,
    failedLogin: req.session.failedLogin ,
    failedSignUp: req.session.failedSignUp
  }

  res.render('login-test', loginObj);
});

router.post('/login', async (req, res) => {
  try {
      const dbUserData = await userController.checkUserByEmail(req.body.email);

      if (!dbUserData) {
          req.session.lastMessage = "Incorrect email or password, please try again";
          res.render('login', { failedLogin: true, message: req.session.lastMessage });
          return;
      }

      const validPassword = await dbUserData.checkPassword(req.body.password);

      if (!validPassword) {
          req.session.lastMessage = "Incorrect email or password, please try again";
          res.render('login', { failedLogin: true, message: req.session.lastMessage });
          return;
      }

      req.session.save(() => {
          req.session.loggedIn = true;
          req.session.userId = dbUserData.id;
          console.log(
              'File: user-routes.js ~ req.session.save ~ req.session.cookie',
              req.session.cookie
          );

          req.session.lastView = 'home';

          req.session.lastMessage = "your in the mainframe!";

          // console.log("---user logged in---");
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
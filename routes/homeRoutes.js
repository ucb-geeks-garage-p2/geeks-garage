const router = require('express').Router();
const { userController } = require('../controllers');
// const { carController } = require('../controllers/');


router.get('/', async (req, res) => {
  if (req.session.loggedIn) {

    const result = await userController.getUserCarsByID(req.session.userID);
    const usersWithCars = result;
    console.log(usersWithCars);
    // console.log(result);
    

    res.render('userpage', { usersWithCars });
  } else {
  // console.log('************** not logged in *************');
  
  const loginObj = {
    message: req.session.lastMessage,
    isLogin: true,
    failedLogin: req.session.failedLogin ,
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

      await req.session.save(() => {
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
});


router.get('/more/:id', async (req, res) => {
  
})


// router.get('/userpage/:id', async (req, res) => {
//   try {
//     const userId = req.params.id;

    
//     // Use the controller function to get user data along with cars
//     const userData = await userController.getUserAllByID(userId);

//     if (!userData) {
//       // Handle case where user is not found
//       res.status(404).json({ message: 'User not found' });
//       return;
//     }

//     // Render the user page with user data
//     res.render('userPage', { user: userData });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });
  


module.exports = router;
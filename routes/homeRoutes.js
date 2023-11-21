const router = require("express").Router();
const { userController } = require("../controllers");
const { carController } = require("../controllers/");
const { taskController } = require("../controllers/");

router.get('/', async (req, res) => {
  if (req.session.loggedIn) {

    const userWithCars = await userController.getUserCarsByID(req.session.userID);
    console.log(userWithCars, "--------user dataset here--------");
    // console.log(result);

    const getCarTasks = async (car) => {
      const tasks = await carController.getCarTasksByID(car.id);
      return tasks;
    }

    const getCarsWithTasks = async () => {
      const promises = userWithCars.cars.map(async (car) => {
        return await getCarTasks(car);
      })
      
      const results = await Promise.all(promises);
      return results;
    }

    const carsWithTasks = (await getCarsWithTasks()).map((car) => {
      car.task_length = car.tasks.length;
      return car;
    });

    console.log(carsWithTasks);




    const viewObj = {
      logged_in: req.session.loggedIn,
      user_id: userWithCars.id,
      username: userWithCars.username,
      carsWithTasks,

    }

    res.render('userpage', viewObj);

    // res.render('userpage', { userWithCars });
  } else {
    // console.log('************** not logged in *************');

    const loginObj = {
      message: req.session.lastMessage,
      isLogin: true,
      failedLogin: req.session.failedLogin,
      failedSignUp: req.session.failedSignUp
    }

    res.render('login', loginObj);
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await userController.checkUserByEmail(req.body.email);

    if (!user) {
      req.session.lastMessage = "Incorrect email or password, please try again";
      res.render('login', { failedLogin: true, message: req.session.lastMessage });
      return;
    }

    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      req.session.lastMessage = "Incorrect email or password, please try again";
      res.render('login', { failedLogin: true, message: req.session.lastMessage });
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
});

router.get('/logout', async (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      // console.log("---user logged out---");
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
});

router.get('/signup', async (req, res) => {
  const loginObj = {
    message: req.session.lastMessage,
    isLogin: false,
    failedLogin: req.session.failedLogin,
    failedSignUp: req.session.failedSignUp
  }

  res.render('login', loginObj);
})


// router.get('/more/:id', async (req, res) => {

// }) 


module.exports = router;

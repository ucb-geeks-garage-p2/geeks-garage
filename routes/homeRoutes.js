const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

<<<<<<< Updated upstream
//withAuth,
router.get('/',  async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
    //   order: [['name', 'ASC']],
    order: [['username', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('landingpage', {
      users,
      logged_in: req.session.logged_in,
=======
router.get("/", async (req, res) => {
  if (req.session.loggedIn) {
    const getUsersCars = await userController.getUserCarsByID(
      req.session.userID
    );
    const usersWithCars = getUsersCars;
    console.log(usersWithCars);
    // console.log(result);

    // need to create a task route to create a few tasks in order to return object to userpage
    // with this code below
    const getUsersTasks = await taskController.getTasks(req.session.userID);
    const usersWithTasks = getUsersTasks;
    console.log(usersWithTasks);

    res.render("userpage", { usersWithCars, usersWithTasks });

    // res.render('userpage', { usersWithCars });
  } else {
    // console.log('************** not logged in *************');

    const loginObj = {
      message: req.session.lastMessage,
      isLogin: true,
      failedLogin: req.session.failedLogin,
      failedSignUp: req.session.failedSignUp,
    };

    res.render("login-test", loginObj);
  }
});

router.post("/", async (req, res) => {
  try {
    const { task_name, created_on, due_by, car_id } = req.body;
    console.log('Request body: ', req.body);
    const newTask = await taskController.createTask({
      task_name,
      created_on,
      due_by,
      car_id,
>>>>>>> Stashed changes
    });
  } catch (err) {
    res.status(500).json(err);
    console.log("error in homepage", err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;

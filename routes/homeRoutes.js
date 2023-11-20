const router = require("express").Router();
const { userController } = require("../controllers");
const { carController } = require("../controllers/");
const { taskController } = require("../controllers/");



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
    // console.log(usersWithTasks);

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

    const newTask = await taskController.createTask({
      task_name,
      created_on,
      due_by,
      car_id,
    });
    res.status(200).json(newTask);
  } catch (err) {
    res.status(500).json(err);
  }
});



router.get('/', async (req, res) => {
  try {
    if (req.session.loggedIn) {
      // Retrieve user cars
      const getUsersCars = await userController.getUserCarsByID(req.session.userID);
      const usersWithCars = getUsersCars;
      console.log(usersWithCars);
      // Retrieve user tasks
      const getUsersTasks = await taskController.getTasks(req.session.userID);
      const usersWithTasks = getUsersTasks;
      console.log(usersWithTasks);
      // Render the userpage with user cars and tasks
      res.render('userpage', { usersWithCars, usersWithTasks });
    } else {
      const loginObj = {
        message: req.session.lastMessage,
        isLogin: true,
        failedLogin: req.session.failedLogin,
        failedSignUp: req.session.failedSignUp,
      };

      res.render('login-test', loginObj);
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
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
    });

    req.session.lastView = "home";
    req.session.lastMessage = "your in the mainframe!";

    // console.log("---user logged in---");
    res.status(200).json(newTask);
  } catch (err) {
    console.log(err);
    req.session.failedSignUp = false;
    req.session.failedLogin = true;
    res.status(500).json(err);
  }
});

//missing login route?
router.post('/login', async (req, res) => {
  try {
    const user = await userController.checkUserByEmail(req.body.email);

    if (!user) {
      req.session.lastMessage = "Invalid email or password";
      res.render('login-test', { failedLogin: true, message: req.session.lastMessage });
      return;
    }

    const validPassword = await user.checkPassword(req.body.password);

    if (!validPassword) {
      req.session.lastMessage = "Invalid email or password";
      res.render('login-test', { failedLogin: true, message: req.session.lastMessage });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userID = user.id;
      console.log(
        'file: user-routes.js ~ req.session.save ~ req.session.cookie',
        req.session.cookie
      );
      req.session.lastMessage = "you're in the mainframe!";
      res.status(200).json(user);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/logout", async (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      // console.log("---user logged out---");
      res.render("login-test");
    });
  } else {
    res.render("login-test");
  }
});

router.get("/more/:id", async (req, res) => {});

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

router.delete('/:taskId', async (req, res) => {
  try {
      const taskId = req.params.taskId;
      const deletedTask = await taskController.deleteTask(taskId);

      if (deletedTask) {
          res.status(200).json({ message: `Task ${taskId} deleted successfully` });
      } else {
          res.status(404).json({ error: `Task ${taskId} not found` });
      }
  } catch (err) {
      console.log(err);
      res.status(500).json(err);
  }
});




router.get('/garage', async (req, res) => {
  try {
    if (req.session.loggedIn) {
      // Retrieve user cars
      const getUsersCars = await userController.getUserCarsByID(req.session.userID);
      const usersWithCars = getUsersCars;

      // Retrieve user tasks
      
      // Return the data as JSON for the API response
      res.render("garage", { usersWithCars });
    } else {
      // If not logged in, return an appropriate response
      res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




module.exports = router;

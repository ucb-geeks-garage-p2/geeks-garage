const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

//withAuth,
router.get('/home',  async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
    //   order: [['name', 'ASC']],
    order: [['username', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('index', { 
      users,
      logged_in: req.session.logged_in,
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

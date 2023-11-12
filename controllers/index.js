// console.log("test");
const router = require('express').Router();

const apiRoutes = require('../routes/apiRoutes');

router.use('/api', apiRoutes);

module.exports = router;


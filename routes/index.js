const router = require('express').Router();
const apiRoutes = require('./apiRoutes');
const homeRoutes = require('./homeRoutes');
const testRoutes = require('./testRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/test', testRoutes);

module.exports = router;

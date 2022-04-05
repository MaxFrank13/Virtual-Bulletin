const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const bulletinRoutes = require('./bulletinRoutes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
// router.use('/bulletin', bulletinRoutes);

module.exports = router;
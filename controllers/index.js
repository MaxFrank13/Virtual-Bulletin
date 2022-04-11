const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const bulletinRoutes = require('./bulletinRoutes');
const groupRoutes = require('./groupRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/group', groupRoutes);
router.use('/bulletin', bulletinRoutes);

module.exports = router;
const router = require('express').Router();

const cardRoutes = require('./cardRoutes');
const userRoutes = require('./userRoutes');
const groupApiRoutes = require('./groupApiRoutes');
const invitationRoutes = require('./invitationRoutes');

router.use('/user', userRoutes);
router.use('/group', groupApiRoutes);
router.use('/invitation', invitationRoutes);
router.use('/card', cardRoutes);

module.exports = router;
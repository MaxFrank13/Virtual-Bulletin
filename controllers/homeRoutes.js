const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');

// GET route for the home page
router.get('/', (req, res) => {
  res.render('homepage', {
		logged_in: req.session.logged_in,
	});
});

// path to a login page if the user is not already logged in
router.get('/login', (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/profile');
		return;
	};

	res.render('login');
});

// GET dashboard
router.get('/dashboard', withAuth, async (req, res) => {
	const userData = await User.findByPk(req.session.user_id, {
		attributes: { exclude: ['password'] },
		// include other user information Groups, Bulletins, Invitations
	});
	const user = userData.get({ plain: true });

	res.render('dashboard', {
		...user,
		logged_in: req.session.logged_in
	});
});


module.exports = router;
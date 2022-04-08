const router = require('express').Router();
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
router.get('/dashboard', withAuth, (req, res) => {
	res.render('dashboard', {
		logged_in: req.session.logged_in,
	})
});


module.exports = router;
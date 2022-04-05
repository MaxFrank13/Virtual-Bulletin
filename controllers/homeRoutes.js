const router = require('express').Router();

// GET route for the home page
router.get('/', (req, res) => {

  res.render('homepage');
});

// path to a login page if the user is not already logged in
router.get('/login', (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/profile');
		return;
	};

	res.render('login');
});

// path to a signup page if the user is not already logged in
router.get('/signup', (req, res) => {
	if (req.session.logged_in) {
		res.redirect('/profile');
		return;
	};

	res.render('signup');
});

module.exports = router;
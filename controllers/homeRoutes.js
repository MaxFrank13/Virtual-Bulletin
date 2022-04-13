const router = require('express').Router();
const { User, Group, GroupUser, Bulletin, Invitation, Card } = require('../models');
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
		res.redirect('/dashboard');
		return;
	};

	res.render('login');
});

// GET dashboard
router.get('/dashboard', withAuth, async (req, res) => {
	const userData = await User.findByPk(req.session.user_id, {
		attributes: { exclude: ['password'] },
		include: [
			{
				model: Group,
				through: GroupUser,
				as: 'groups',
				include: [
					{
						model: Bulletin,
						include: [
							{
								model: Card,
							},
						],
					},
				],
			},
			{
				model: Invitation,
				include: [
					{
						model: Group,
					},
				],
			},
		],
	});
	const user = userData.get({ plain: true });

	const bulletins = user.groups.reduce((array, group) => {
		return array.concat(group.bulletins); 
	}, []);

	const invites = user.invitations.filter(invite => invite.user_accepted === null);

	res.render('dashboard', {
		...user,
		invites,
		bulletins,
		logged_in: req.session.logged_in
	});
});


module.exports = router;
const router = require('express').Router();
const { User, Group, Role } = require('../../models');

// get user by ID
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [
        {
          model: Group,
        },
        {
          model: Role,
        },
      ],
    });

    res.status(200).json(userData);
  } catch(err) {
    res.status(400).json(err);
  }
});

// creates a user and hashes their password before saving to database
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  };
});

// edit a user's info (i.e. name, add/remove group affiliations)
router.put('/', async (req, res) => {
  try {
    const userData = await User.update(req.session.user_id, req.body);

    res.status(200).json(userData);

  } catch(err) {

  };
});

// makes a request to database to see if user's input matches an email and password
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// logs the user out and ends their session
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
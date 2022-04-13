const router = require('express').Router();
const { Bulletin, Card, User } = require('../models');
const withAuth = require('../utils/auth');

// get a blank bulletin
router.get('/', withAuth, (req, res) => {
  try {
    res.render('bulletin', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  };
});

// GET Bulletin by ID and include its associated cards
router.get('/:id', withAuth, async (req, res) => {
  try {
    const bulletinData = await Bulletin.findByPk(req.params.id, {
      include: [
        {
          model: Card,
          include: [
            {
              model: User,
              attributes: {
                exclude: ['password'],
              },
            },
          ],
        },
      ],
    });

    const bulletin = bulletinData.get({ plain: true });

    res.render('bulletin', {
      ...bulletin,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  };
});

// POST route to create a new Bulletin and render it to the page
router.post('/', withAuth, async (req, res) => {
  try {
    const newBulletin = await Bulletin.create(req.body);

    res.status(200).json(newBulletin);
  } catch(err) {
    res.status(500).json(err);
  };
});

// DELETE route to delete bulletin

module.exports = router;
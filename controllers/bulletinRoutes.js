const router = require('express').Router();
const withAuth = require('../utils/auth');

// get a bulletin
router.get('/', withAuth, (req, res) => {
  try {
    res.render('bulletin', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  };
});

// GET route to get Bulletin and it's associated cards
router.get('/:id', withAuth, (req, res) => {
  try {
    res.render('bulletin', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  };
});

// POST route to create a new one and render it to the page

// DELETE route to delete bulletin

module.exports = router;
const router = require('express').Router();
const { Card, User } = require('../../models');
const withAuth = require('../../utils/auth');

// GET card by id and return data
router.get('/:id', withAuth, async(req, res) => {
  try {
    const cardData = await Card.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: {
            exclude: ['password'],
          },
        },
      ],
    });

    res.status(200).json(cardData);
  } catch(err) {
    res.status(500).json(err);
  };
});

// POST route to add new cards to DB
router.post('/', withAuth, async (req, res) => {
  try {
    const newCard = await Card.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newCard);
  } catch(err) {
    res.status(500).json(err);
  };
});

// PUT route to edit their contents
router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatedCard = await Card.update(req.body,
      {
        where: {
          id: req.params.id,
        },
      },
    );

    res.status(200).json(updatedCard);
  } catch(err) {
    res.status(500).json(err);
  };
});

// DELETE route to delete a card
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const deleteCard = await Card.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(deleteCard);
  } catch(err) {
    res.status(500).json(err);
  };
});

module.exports = router;
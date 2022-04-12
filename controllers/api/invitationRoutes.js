// routes for storing and passing invitations
const router = require('express').Router();
const { User, Group, GroupUser, Invitation } = require('../../models');
const withAuth = require('../../utils/auth');

// POST new invitation by email
router.post('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findOne({
      attributes: {
        exclude: ['password'],
      },
      where: {
        email: req.body.email,
      },
    });

    const {id} = await userData.get({ plain: true });

    const newInvite = await Invitation.create({
      ...req.body,
      user_id: id,
    })

    res.status(200).json(newInvite);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const inviteData = await Invitation.destroy({
      where: {
        id: req.params.id
      },
    });

    res.status(200).json(inviteData);

  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;
// routes for storing and passing invitations
const router = require('express').Router();
const { json } = require('express/lib/response');
const { User, Group, GroupUser, Invitation, Role } = require('../../models');
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

// PUT to assign the 'accepted' boolean value
router.put('/:id', withAuth, async (req, res) => {
  try {
    const invitationData = await Invitation.update(
      {
        user_accepted: req.body.user_accepted,
      },
      {
        where:
        {
          id: req.params.id,
        },
      },
    );

    if (req.body.user_accepted) {
      const newGroupUser = await GroupUser.create({
        group_id: req.body.group_id,
        user_id: req.session.user_id,
      });
      const newRole = await Role.create({
        role_name: 'Contributor',
        group_id: req.body.group_id,
        user_id: req.session.user_id,
      })
      res.status(200).json({
        invitationData,
        newGroupUser,
        newRole,
      });
    } else {
      res.status(200).json(invitationData);
    };

  } catch (err) {
    res.status(500).json(err);
  };
});

// DELETE invitation by id
router.delete('/:id', async (req, res) => {
  try {
    const deleteInvite = await Invitation.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(deleteInvite);

  } catch (err) {
    res.status(500).json(err);
  };
});



module.exports = router;
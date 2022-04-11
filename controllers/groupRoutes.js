const router = require('express').Router();
const { Group, GroupUser, User, Role, Bulletin } = require('../models');
const withAuth = require('../utils/auth');

// GET route to display group info (i.e. the groups they belong to) for user's dashboard
router.get('/all', async (req, res) => {
  try {
    const groupData = await Group.findAll({
      include: [
        {
          model: User,
          through: GroupUser,
          as: 'users',
        },
      ],
    });

    const groups = groupData.map(group => group.get({ plain: true }));

    res.status(200).json(groups);
  } catch(err) {
    res.status(500).json(err);
  };
});


// GET group by its name
router.get('/:id', async (req, res) => {
  try {
    const groupData = await Group.findByPk(req.params.id, {
      include: [
        {
          model: User,
          through: GroupUser,
          as: 'users',
        },
        {
          model: Bulletin,
        },
      ],
    });

    const group = groupData.get({ plain: true });

    // res.status(200).json(group);

    res.render('group', {
      ...group,
      logged_in: req.session.logged_in
    })
  } catch(err) {
    res.status(500).json(err);
  };
});

// POST route for creating a new group
router.post('/', withAuth, async (req, res) => {
  try {
    const newGroup = await Group.create({
      ...req.body,
    });

    const newGroupUser = await GroupUser.create({
      group_id: newGroup.id,
      user_id: req.session.user_id,
    });

    res.status(200).json({
      newGroup,
      newGroupUser
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE route to disband group

module.exports = router;
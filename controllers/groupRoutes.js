const router = require('express').Router();
const { Group, GroupUser, User, Role, Bulletin, Card } = require('../models');
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
          attributes: {
            exclude: ['password'],
          },
          include: [
            {
              model: Role,
              through: GroupUser,
              as: 'roles',
            },
          ],
        },
      ],
    });

    const groups = groupData.map(group => group.get({ plain: true }));

    res.status(200).json(groups);
  } catch(err) {
    res.status(500).json(err);
  };
});


// GET group by its id
router.get('/:id', async (req, res) => {
  try {
    const groupData = await Group.findByPk(req.params.id, {
      include: [
        {
          model: User,
          through: GroupUser,
          as: 'users',
          attributes: {
            exclude: ['password'],
          },
          include: [
            {
              model: Role,
              through: GroupUser,
              as: 'roles',
            },
          ],
        },
        {
          model: Bulletin,
          include: [
            {
              model: Card,
            },
          ],
        },
      ],
    });

    const group = groupData.get({ plain: true });

    // const {role_name} = group.roles[0];

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
      role_id: 2,
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
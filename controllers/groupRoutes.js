const router = require('express').Router();
const { Group, GroupUser, User, Role, Bulletin, Card } = require('../models');
const withAuth = require('../utils/auth');

// GET route to display group info (i.e. the groups they belong to) for user's dashboard
router.get('/all', async (req, res) => {
  try {
    const groupData = await Group.findAll({
      include: [
        {
          model: Role,
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
              where: {
                group_id: req.params.id,
              }
            }
          ]
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

    // res.status(200).json(group);

    res.render('group', {
      ...group,
      logged_in: req.session.logged_in
    });
  } catch(err) {
    res.status(500).json(err);
  };
});

// GET group_id by name and user_id
router.get('/getId/:name', async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {
        exclude: ['password'],
      },
      include: [
        {
          model: Group,
          through: GroupUser,
          as: 'groups',
        },
      ],
    });

    const {groups} = await userData.get({ plain: true });

    const {id} = await groups.find(group => group.group_name === req.params.name);

    res.status(200).json(id);

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

    const newRole = await Role.create({
      role_name: 'Creator',
      group_id: newGroup.id,
      user_id: req.session.user_id,
    })

    res.status(200).json({
      newGroup,
      newGroupUser,
      newRole
    });

  } catch (err) {
    res.status(500).json(err);
  };
});

// DELETE route to disband group

router.delete('/:id', withAuth, async (req, res) => {
  try {

    // **** TO DO ****
    
    // add in authentication to make sure user is the creator of group
    
    // ****

    const deleteGroup = await Group.destroy({
      where: {
        id: req.params.id,
      },
    });

    const deleteGroupUser = await GroupUser.findAll({
      where: {
        group_id: req.params.id,
      },
    });

    res.status(200).json({
      deleteGroup,
      deleteGroupUser,
    });

  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;
const router = require('express').Router();
const { Group, User, GroupUser, Bulletin, Card } = require('../../models');

// GET group data by id
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
        },
        {
          model: Bulletin,
          include: [
            {
              model: Card,
            }
          ]
        },
      ],
    });

    const group = groupData.get({ plain: true });

    res.status(200).json(group);

  } catch(err) {
    res.status(500).json(err);
  };
});

// GET group that a user belongs to by its name
router.get('/', async (req, res) => {
  try {
    const userGroupData = await User.findByPk(5, {
      attributes: ['id'],
      include: [
        {
          model: Group,
          through: GroupUser,
          as: 'groups',
        },
      ],
    });

    const {groups} = userGroupData.get({ plain: true });
    const groupName = req.originalUrl.split('?')[1].split('%20').join(' ');
    const group = groups.filter(group => group.group_name === groupName);
    
    res.status(200).json(...group);

  } catch(err) {
    res.status(500).json(err);
  };
});

module.exports = router;
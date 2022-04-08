const { GroupUser } = require('../models');

const groupUserData = [
  {
    "group_id": 1,
    "user_id": 1,
    "role_id": 1,
  },
  {
    "group_id": 1,
    "user_id": 2,
    "role_id": 1,
  },
  {
    "group_id": 1,
    "user_id": 3,
    "role_id": 1,
  },
  {
    "group_id": 1,
    "user_id": 4,
    "role_id": 1,
  },
];

const seedGroupUser = () => GroupUser.bulkCreate(groupUserData);

module.exports = seedGroupUser;
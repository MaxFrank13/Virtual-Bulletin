const { Group } = require('../models');

const groupData = [
  {
    "group_name": "The Troubadours"
  },
  {
    "group_name": "The Wombats"
  },
];

const seedGroups = () => Group.bulkCreate(groupData);

module.exports = seedGroups;
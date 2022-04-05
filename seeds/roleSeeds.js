const { Role } = require('../models');

const roleData = [
  {
    "role_name": "Contributor"
  },
  {
    "role_name": "Viewer"
  },
];

const seedRoles = () => Role.bulkCreate(roleData);

module.exports = seedRoles;
const { sequelize } = require('../models/User');
const seedUsers = require('./userSeeds');
const seedGroups = require('./groupSeeds');
const seedRoles = require('./roleSeeds');
const seedGroupUser = require('./groupUserSeeds');

const seedDataBase = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n')

  await seedGroups();
  console.log('\n----- GROUPS SEEDED -----\n')

  await seedRoles();
  console.log('\n----- ROLES SEEDED -----\n')

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n')

  await seedGroupUser();
  console.log('\n----- GROUPUSER SEEDED -----\n')

  process.exit(0);
};

seedDataBase();
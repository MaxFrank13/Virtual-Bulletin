const { User } = require('../models');

const userData = [
  {
    "name": "Max",
    "email": "max13@hotmail.com",
    "password": "password12345",
    "role_id": 1
  },
  {
    "name": "Bones",
    "email": "bones12hotmail.com",
    "password": "password12345",
    "role_id": 1
  },
  {
    "name": "Floyd",
    "email": "floyd15@hotmail.com",
    "password": "password12345",
    "role_id": 1
  },
  {
    "name": "Malone",
    "email": "malone22@hotmail.com",
    "password": "password12345",
    "role_id": 1
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;

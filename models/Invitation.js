// invitation for group
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Invitation extends Model {}

Invitation.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    message: {
      type: DataTypes.STRING,
    },
    group_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'group',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'invitation',
  },
);

module.exports = Invitation;
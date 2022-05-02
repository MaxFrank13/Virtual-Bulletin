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
      defaultValue: 'Join invitation',
      validate: {
        len: {
          args: [4, 42],
          msg: "Message must be between 4 and 42 characters",
        },
      },
    },
    user_accepted: {
      type: DataTypes.BOOLEAN,
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
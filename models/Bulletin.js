const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Bulletin extends Model {}

Bulletin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    bulletin_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    group_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'group',
        key: 'id',
      },
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'bulletin',
  },
);

module.exports = Bulletin;

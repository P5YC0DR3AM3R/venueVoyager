const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserStadium extends Model {}

UserStadium.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
      onDelete: 'CASCADE'
    },
    stadium_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'stadium',
        key: 'id',
      },
      onDelete: 'CASCADE'
    },
    date_visited: {
      type: DataTypes.DATE
    },
    rating: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5
      }
    },
    review: {
      type: DataTypes.STRING
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'user_stadium',
  }
);

module.exports = UserStadium;

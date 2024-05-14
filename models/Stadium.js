const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Stadium extends Model {}

Stadium.init(
  {
    stadium_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location_city: {
      type: DataTypes.STRING,
    },
    location_state: {
      type: DataTypes.STRING,
    },
    team_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'team', 
        key: 'id',
      },
    },
   user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'stadium',
  }
);

module.exports = Stadium;

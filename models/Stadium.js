const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Stadium extends Model {}

Stadium.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    stadium: {
      type: DataTypes.STRING,
    },
    league: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    division: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    team: {
      type: DataTypes.STRING,
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

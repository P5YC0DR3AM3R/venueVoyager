const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Stadium extends Model {}

Stadium.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    stadium_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    official_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stadium_name_clean: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stadium_name_robust_clean: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    team: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    league: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    division: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "stadium",
  }
);

module.exports = Stadium;

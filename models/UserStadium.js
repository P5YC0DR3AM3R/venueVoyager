const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UserStadium extends Model {}

UserStadium.init(
    {
        date_visited: {
            type: DataTypes.DATE,
          },
          rating: {
            type: DataTypes.INTEGER,
            validate: {
              min: 1,
              max: 5, // Adjust validation range as needed
            },
          },
          review: {
            type: DataTypes.STRING,
          },
    }, 
    {
        sequelize,
        timestamps: false, 
        freezeTableName: true, 
        underscored: true,
        modelName: 'user_stadiums',
    }
);

module.exports = UserStadium;
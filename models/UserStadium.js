const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class userStadium extends Model {}

userStadium.init(
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
          user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'user',
              key: 'id',
            },
          },
          stadium_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'stadium',
                key: 'id',
              },
          },
    }, 
    {
        sequelize,
        timestamps: false, 
        freezeTableName: true, 
        underscored: true,
        modelName: 'userStadium',
    }
);

module.exports = userStadium;
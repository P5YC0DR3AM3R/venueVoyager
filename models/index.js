const User = require("./User");
const Stadium = require("./Stadium");
const userStadium = require('./UserStadium');

User.belongsToMany(Stadium, {
  through: userStadium,
  foreignKey: 'userId',
  otherKey: 'stadiumId'
});

Stadium.belongsToMany(User, {
  through: userStadium,
  foreignKey: 'stadiumId',
  otherKey: 'userId'
});

module.exports = { User, Stadium, userStadium};

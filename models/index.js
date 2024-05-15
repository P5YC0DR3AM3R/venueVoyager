const User = require("./User");
const Stadium = require("./Stadium");
const UserStadium = require("./UserStadium");

User.belongsToMany(Stadium, {
  through: UserStadium,
  foreignKey: "userId",
  otherKey: "stadiumId",
});

Stadium.belongsToMany(User, {
  through: UserStadium,
  foreignKey: "stadiumId",
  otherKey: "userId",
});

module.exports = { User, Stadium, UserStadium };

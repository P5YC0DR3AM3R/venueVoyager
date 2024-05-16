const User = require("./User");
const Stadium = require("./Stadium");
const UserStadium = require("./UserStadium");

User.belongsToMany(Stadium, {
  through: UserStadium,
  foreignKey: "user_id",
  otherKey: "stadium_id",
});

Stadium.belongsToMany(User, {
  through: UserStadium,
  foreignKey: "stadium_id",
  otherKey: "user_id",
});

module.exports = { User, Stadium, UserStadium };

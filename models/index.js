const User = require("./User");
const Stadium = require("./Stadium");
const UserStadium = require("./UserStadium");

User.belongsToMany(Stadium, {
  through: UserStadium,
  foreignKey: "user_id",
  otherKey: "stadium_id",
  onDelete: "CASCADE",
});

Stadium.belongsToMany(User, {
  through: UserStadium,
  foreignKey: "stadium_id",
  otherKey: "user_id",
  onDelete: "CASCADE",
});

module.exports = { User, Stadium, UserStadium };

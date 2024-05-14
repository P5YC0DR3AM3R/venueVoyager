const User = require("./User");
const Stadium = require("./Stadium");

User.belongsToMany(Stadium, {
  through: "user_stadiums",
  foreignKey: "user_id",
});

Stadium.belongsToMany(User, {
  through: "user_stadiums",
  foreignKey: "stadium_id",
});

module.exports = { User, Stadium, Team };

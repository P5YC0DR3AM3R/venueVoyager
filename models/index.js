const User = require('./User');
const Post = require('./Post');
const Stadium = require('./Stadium');
const UserStadium = require('./UserStadium');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Stadium.hasMany(Post, {
  foreignKey: 'stadium_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(Stadium, {
  foreignKey: 'stadium_id'
});

User.belongsToMany(Stadium, {
  through: UserStadium,
  foreignKey: 'user_id'
});

Stadium.belongsToMany(User, {
  through: UserStadium,
  foreignKey: 'stadium_id'
});

module.exports = { User, Post, Stadium, UserStadium };

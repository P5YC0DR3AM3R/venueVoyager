const User = require('./User');
const Stadium = require('./Stadium');
const Team = require('./Team');

User.belongsToMany(Stadium, 
  { through: 'user_stadiums', 
  foreignKey: 'user_id' });

Stadium.belongsToMany(User, 
  { through: 'user_stadiums',
   foreignKey: 'stadium_id' });


Team.belongsTo(Stadium,{
  foreignKey:'team_id'
})
Stadium.hasMany(Team,{
  foreignKey:'team_id'
})
module.exports = { User, Stadium, Team}
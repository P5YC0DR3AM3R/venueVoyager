const sequelize = require("../config/connection");
const { User, Stadium } = require("../models");

const userData = require("./userData.json");
const stadiumData = require("./stadiumData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const stadium of stadiumData) {
    await Stadium.create({
      ...stadium,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();

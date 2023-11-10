const seedUsers = require('./user-seeds');
const seedCars = require('./car-seeds');
const seedTasks = require('./task-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedCategories();
  console.log('\n----- USERS SEEDED -----\n');

  await seedProducts();
  console.log('\n----- CARS SEEDED -----\n');

  await seedTags();
  console.log('\n----- TASKS SEEDED -----\n');

  process.exit(0);
};

seedAll();

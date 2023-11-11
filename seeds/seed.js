const seedUsers = require('./user-seeds.json');
const seedCars = require('./car-seeds.json');
const seedTasks = require('./task-seeds.json');
const seedNotes = require('./note-seeds.json');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  await seedCars();
  console.log('\n----- CARS SEEDED -----\n');

  await seedTasks();
  console.log('\n----- TASKS SEEDED -----\n');

  await seedNotes();
  console.log('\n----- NOTES SEEDED -----\n');

  process.exit(0);
};


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedAll();

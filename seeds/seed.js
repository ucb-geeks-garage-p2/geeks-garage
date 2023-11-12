const {
  User,
  Task,
  Car,
  Note
} = require('../models');

const userData = require('./user-seeds.json');
const carData = require('./car-seeds.json');
const taskData = require('./task-seeds.json');
const noteData = require('./note-seeds.json');

const sequelize = require('../config/connection');

async function seedUsers() {
  let users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  users = users.map(user => {
    const {
      dataValues: {
        id,
        username
      }
    } = user;

    return { id, username };
  });

  return users;
}

async function seedCars(users) {

  let cars = carData.map(car => {
    let carName = `${car.make} ${car.model}`;
    switch (carName) {
      case 'honda accord':
        for (const user of users) {
          if (user.username === 'jshienbaum') {
            car.user_id = user.id;
          }
        }
        return car;
      case 'jeep grand cherokee':
        for (const user of users) {
          if (user.username === 'cdouglas') {
            car.user_id = user.id;
          }
        }
        return car;
      case 'bmw 428i':
        for (const user of users) {
          if (user.username === 'kbarrett') {
            car.user_id = user.id;
          }
        }
        return car;
      case 'volkswagen id.4':
        for (const user of users) {
          if (user.username === 'carla') {
            car.user_id = user.id;
          }
        }
        return car;
      case 'nissan versa':
        for (const user of users) {
          if (user.username === 'steve') {
            car.user_id = user.id;
          }
        }
        return car;
      case 'nissan altima':
        for (const user of users) {
          if (user.username === 'kbarrett') {
            car.user_id = user.id;
          }
        }
        return car;
      case 'honda rebel 500':
        for (const user of users) {
          if (user.username === 'steve') {
            car.user_id = user.id;
          }
        }
        return car;
      default:

    }

  })
  
  cars = await Car.bulkCreate(cars, {
    individualHooks: true,
    returning: true,
  });

  cars = cars.map(user => {
    const {
      dataValues: {
        id,
        make,
        model
      }
    } = user;

    const carName = `${make} ${model}`;

    return { id, carName };
  });


  return cars;
}

async function seedTasks(cars) {

  const tasks = '';

  switch ('') {
    case '':

      break;
  }

  return tasks;
}

async function seedNotes(tasks) {

  const notes = '';

  switch ('') {
    case '':

      break;
  }

  return notes;
}

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  const users = await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');
  console.log(users);
  const cars = await seedCars(users);
  console.log('\n----- CARS SEEDED -----\n');
  console.log(cars);
  // const tasks = await seedTasks();
  // console.log('\n----- TASKS SEEDED -----\n');
  // console.log(tasks);
  // const notes = await seedNotes();
  // console.log('\n----- NOTES SEEDED -----\n');
  // console.log(notes);
  process.exit(0);
};

seedAll();

module.exports = seedAll;
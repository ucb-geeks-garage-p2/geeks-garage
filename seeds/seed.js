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
    const carName = `${car.make} ${car.model}`;
    switch (carName) {
      case 'honda accord':
        for (const user of users) {
          if (user.username === 'jshienbaum') {
            car.user_id = user.id;
            return car;
          }
        }
        break;
      case 'jeep grand cherokee':
        for (const user of users) {
          if (user.username === 'cdouglas') {
            car.user_id = user.id;
            return car;
          }
        }
        break;
      case 'bmw 428i':
        for (const user of users) {
          if (user.username === 'kbarrett') {
            car.user_id = user.id;
            return car;
          }
        }
        break;
      case 'volkswagen id.4':
        for (const user of users) {
          if (user.username === 'carla') {
            car.user_id = user.id;
            return car;
          }
        }
        break;
      case 'nissan versa':
        for (const user of users) {
          if (user.username === 'steve') {
            car.user_id = user.id;
            return car;
          }
        }
        break;
      case 'nissan altima':
        for (const user of users) {
          if (user.username === 'kbarrett') {
            car.user_id = user.id;
            return car;
          }
        }
        break;
      case 'honda rebel 500':
        for (const user of users) {
          if (user.username === 'steve') {
            car.user_id = user.id;
            return car;
          }
        }
        break;
      default:

    }

  })

  cars = await Car.bulkCreate(cars, {
    individualHooks: true,
    returning: true,
  });

  cars = cars.map(car => {
    const {
      dataValues: {
        id,
        make,
        model
      }
    } = car;

    return { id, make, model };
  });


  return cars;
}

async function seedTasks(cars) {

  let tasks = taskData.map(task => {
    switch (task.task_name) {
      case 'honda_accord_task_1':
        for (const car of cars) {
          const carName = `${car.make} ${car.model}`;
          if (carName === 'honda accord') {
            task.car_id = car.id;
            return task;
          }
        }
        break;
      case 'honda_accord_task_2':
        for (const car of cars) {
          const carName = `${car.make} ${car.model}`;
          if (carName === 'honda accord') {
            task.car_id = car.id;
            return task;
          }
        }
        break;
      case 'jeep_grand_task_1':
        for (const car of cars) {
          const carName = `${car.make} ${car.model}`;
          if (carName === 'jeep grand cherokee') {
            task.car_id = car.id;
            return task;
          }
        }
        break;
      case 'bmw_428i_task_1':
        for (const car of cars) {
          const carName = `${car.make} ${car.model}`;
          if (carName === 'bmw 428i') {
            task.car_id = car.id;
            return task;
          }
        }
        break;
      case 'nissan_versa_task_1':
        for (const car of cars) {
          const carName = `${car.make} ${car.model}`;
          if (carName === 'nissan versa') {
            task.car_id = car.id;
            return task;
          }
        }
        break;
      case 'nissan_altima_task_1':
        for (const car of cars) {
          const carName = `${car.make} ${car.model}`;
          if (carName === 'nissan altima') {
            task.car_id = car.id;
            return task;
          }
        }
        break;
      case 'honda_rebel_task_1':
        for (const car of cars) {
          const carName = `${car.make} ${car.model}`;
          if (carName === 'honda rebel 500') {
            task.car_id = car.id;
            return task;
          }
        }
        break;
      default:

    }

  })

  tasks = await Task.bulkCreate(tasks, {
    individualHooks: true,
    returning: true,
  });

  tasks = tasks.map(task => {
    const {
      dataValues: {
        id,
        task_name
      }
    } = task;

    return { id, task_name };
  });

  return tasks;
}

async function seedNotes(tasks) {

  let notes = noteData.map(note => {
    switch (note.message) {
      case 'honda_accord1_note_1':
        for (const task of tasks) {
          if (task.task_name === "honda_accord_task_1") {
            note.task_id = task.id;
            return note;
          }
        }
        break;
      case 'honda_accord1_note_2':
        for (const task of tasks) {
          if (task.task_name === "honda_accord_task_2") {
            note.task_id = task.id;
            return note;
          }
        }
        break;
      case 'jeep_grand_note_1':
        for (const task of tasks) {
          if (task.task_name === "jeep_grand_task_1") {
            note.task_id = task.id;
            return note;
          }
        }
        break;
      case 'bmw_428i_note_1':
        for (const task of tasks) {
          if (task.task_name === "bmw_428i_task_1") {
            note.task_id = task.id;
            return note;
          }
        }
        break;
      case 'nissan_versa_note_1':
        for (const task of tasks) {
          if (task.task_name === "nissan_versa_task_1") {
            note.task_id = task.id;
            return note;
          }
        }
        break;
      case 'nissan_altima_note_1':
        for (const task of tasks) {
          if (task.task_name === "nissan_altima_task_1") {
            note.task_id = task.id;
            return note;
          }
        }
        break;
      case 'honda_rebel_note_1':
        for (const task of tasks) {
          if (task.task_name === "honda_rebel_task_1") {
            note.task_id = task.id;
            return note;
          }
        }
        break;
      default:

    }

  })

  notes = await Note.bulkCreate(notes, {
    individualHooks: true,
    returning: true,
  });

  notes = notes.map(note => {
    const {
      dataValues: {
        id,
        message
      }
    } = note;

    return { id, message };
  });

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
  const tasks = await seedTasks(cars);
  console.log('\n----- TASKS SEEDED -----\n');
  console.log(tasks);
  const notes = await seedNotes(tasks);
  console.log('\n----- NOTES SEEDED -----\n');
  console.log(notes);
  process.exit(0);
};

seedAll();

module.exports = seedAll;
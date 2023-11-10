const { Task } = require('../models');

const taskData = [
  
];

const seedTasks = () => Task.bulkCreate(taskData);

module.exports = seedTasks;

const { Car } = require('../models');

const carData = [
  
];

const seedCars = () => Car.bulkCreate(carData);

module.exports = seedCars;

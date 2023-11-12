const User = require('./User');
const Task = require('./Task');
const Car = require('./Car');
const Note = require('./Note');

User.hasMany(Car, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Car.belongsTo(User, {
  foreignKey: 'user_id',
});

Car.hasMany(Task, {
  foreignKey: 'car_id',
  onDelete: 'CASCADE',
});

Task.belongsTo(Car, {
  foreignKey: 'car_id'
});

Task.hasMany(Note, {
  foreignKey: 'task_id',
  onDelete: 'CASCADE',
});

Note.belongsTo(Task, {
  foreignKey: 'task_id'
});

module.exports = {
  User,
  Task,
  Car,
  Note
};

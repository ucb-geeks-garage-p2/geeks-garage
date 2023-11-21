const handlebars = require('handlebars');
const { format } = require('date-fns');

// Register the 'ifEquals' helper
handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
  return arg1 === arg2 ? options.fn(this) : options.inverse(this);
});

handlebars.registerHelper('formatDate', function (date) {
  // Implement your date formatting logic here
  return date.toISOString().slice(0, 10);
});

handlebars.registerHelper('eq', function (a, b, opts) {
  return a === b ? opts.fn(this) : opts.inverse(this);
});

handlebars.registerHelper('filterTasks', function(usersWithTasks, carId) {
    return (usersWithTasks || []).filter(task => task.car_id === carId);
})

handlebars.registerHelper('returnFormatDate', function(timestamp) {
  const date = new Date(timestamp * 1000);
  return format(date, 'MM-dd-yyyy');
});

// Export the handlebars instance
module.exports = handlebars;
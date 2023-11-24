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
  if (timestamp === null) {
    return 'Sometime';
  }

  const timestampNumber = typeof timestamp === 'string' ? parseInt(timestamp, 10) : timestamp;

  if (typeof timestampNumber === 'number' && !isNaN(timestampNumber)) {
    const date = new Date(timestampNumber);
    return format(date, 'MM-dd-yyyy');
  } else {
    // Handle the case where timestamp is not a valid number
    return 'A long time ago in a galaxy far far away....';
  }
});

handlebars.registerHelper('returnDayDate', function(timestamp) {
  if (timestamp === null) {
    return '?';
  }

  const timestampNumber = typeof timestamp === 'string' ? parseInt(timestamp, 10) : timestamp;

  if (typeof timestampNumber === 'number' && !isNaN(timestampNumber)) {
    const date = new Date(timestampNumber);
    return format(date, 'dd');
  } else {
    // Handle the case where timestamp is not a valid number
    return '?!';
  }
});

handlebars.registerHelper('returnMonthDate', function(timestamp) {
  if (timestamp === null) {
    return '___';
  }

  const timestampNumber = typeof timestamp === 'string' ? parseInt(timestamp, 10) : timestamp;

  if (typeof timestampNumber === 'number' && !isNaN(timestampNumber)) {
    const date = new Date(timestampNumber);
    return format(date, 'MMM');
  } else {
    // Handle the case where timestamp is not a valid number
    return '===';
  }
});

// Export the handlebars instance
module.exports = handlebars;
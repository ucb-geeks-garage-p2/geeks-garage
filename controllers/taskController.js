const { User, Car, Task, Note } = require("../models");

async function checkTask(id) {
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      throw new Error("task does not exist");
    }
    return task;
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}
//old get tasks function 
// async function getTasks() {
//   try {
//     const tasks = await Task.findAll();
//     return tasks.get({ plain: true });
//   } catch (error) {
//     console.log(error);
//     throw new Error("there was an error getting tasks");
//   }
// }

async function getTasks() {
  try {
    const tasks = await Task.findAll();
    return tasks.map((task) => task.get({ plain: true }));
  } catch (error) {
    console.log(error);
    throw new Error("There was an error getting tasks");
  }
}

async function getTasksNotes() {
  try {
    const tasks = await Task.findAll({
      include: [Note],
    });
    return tasks.get({ plain: true });
  } catch (error) {
    console.log(error);
    throw new Error("there was an error getting tasks");
  }
}

async function getTaskByID(id) {
  try {
    await checkTask(id);
    const task = await Task.findByPk(id);
    return task.get({ plain: true });
  } catch (error) {
    console.log(error);
    throw new Error("task had an error being found");
  }
}

async function getTaskNotesByID(id) {
  try {
    await checkTask(id);
    const task = await Task.findByPk(id, {
      include: [Note],
    });
    return task.get({ plain: true });
  } catch (error) {
    console.log(error);
    throw new Error("there was an error getting task");
  }
}

async function createTask(body) {
  try {
    const task = await Task.create({
      task_name: body.task_name,
      created_on: body.created_on,
      due_by: body.due_by,
      car_id: body.car_id,
    });
    return task.get({ plain: true });
  } catch (error) {
    console.log(error);
    throw new Error("task had an error being created");
  }
}

async function updateTask(id, body) {
  try {
    let task = await checkTask(id);
    await task.update({
      task_name: body.task_name,
      created_on: body.created_on,
      due_by: body.due_by,
      car_id: body.car_id,
    });
    task = await checkTask(id);
    return task.get({ plain: true });
  } catch (error) {
    console.log(error);
    throw new Error("task had an error updating");
  }
}

async function deleteTask(id) {
  try {
    const task = await checkTask(id);
    await task.destroy();
    console.log("deleted task");
    return task.get({ plain: true });
  } catch (error) {
    console.log(error);
    throw new Error("task had an error being deleted");
  }
}

async function deleteBulkTask(ids) {
  try {
    const tasks = await Task.destroy({ where: { id: ids } });
    return tasks.get({ plain: true });
  } catch (error) {
    console.log(error);
    throw new Error("tasks had an error being deleted");
  }
}

module.exports = {
  checkTask,
  getTasks,
  getTasksNotes,
  getTaskByID,
  getTaskNotesByID,
  createTask,
  updateTask,
  deleteTask,
  deleteBulkTask,
};

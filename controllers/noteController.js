const { User, Car, Task, Note } = require("../models");

async function checkNote(id) {
  try {
    const note = await Note.findByPk(id);
    if (!note) {
      throw new Error("note does not exist");
    }
    return note;
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
}

async function getNotes() {
  try {
    const tasks = await Task.findAll();
    return tasks;
  } catch (error) {
    console.log(error);
    throw new Error("there was an error getting tasks");
  }
}

async function getNoteByID(id) {
  try {
    await checkNote(id);
    const note = await Note.findByPk(id);
    return note;
  } catch (error) {
    console.log(error);
    throw new Error("note had an error being found");
  }
}

async function createNote(body) {
  try {
    const note = await Note.create({
      message: body.message,
      task_id: body.task_id,
    });
    return note;
  } catch (error) {
    console.log(error);
    throw new Error("note had an error being created");
  }
}

async function updateNote(id, body) {
  try {
    let note = await checkNote(id);
    await task.update({
      message: body.message,
      task_id: body.task_id,
    });
    return note;
  } catch (error) {
    console.log(error);
    throw new Error("note had an error being created");
  }
}

async function deleteNote(id) {
  try {
    const note = await checkNote(id);
    await note.destroy();
    console.log("deleted note");
  } catch (error) {
    console.log(error);
    throw new Error("note had an error being deleted");
  }
}

async function deleteBulkNote(ids) {
  try {
    const notes = await Note.destroy({ where: { id: ids } });
    return note;
  } catch (error) {
    console.log(error);
    throw new Error("note had an error being deleted");
  }
}

module.exports = {
  checkNote,
  getNotes,
  getNoteByID,
  createNote,
  updateNote,
  deleteNote,
  deleteBulkNote,
};

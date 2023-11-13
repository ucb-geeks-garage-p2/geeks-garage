
const { User, Car, Task, Note } = require('../models');

async function checkUser(id) {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error("user does not exist");
        }
        return user;
    } catch (error) {
        console.log(error);
        throw Error(error);
    }
}

async function getUsers() { // admin privileges
    try {
        const users = await User.findAll();
        return users;
    } catch (error) {
        console.log(error);
        throw new Error('there was an error getting users');
    }
}

async function getUsersCars() {
    try {
        const users = await User.findAll({
            include: [
                Car,
            ]
        });
        return users;
    } catch (error) {
        console.log(error);
        throw new Error('there was an error getting users and cars');
    }
}

async function getUsersTasks() {
    try {
        const users = await User.findAll({
            include: [
                Car,
                Task,
            ]
        });
        return users;
    } catch (error) {
        console.log(error);
        throw new Error('there was an error getting users, cars, and tasks');
    }
}

async function getUsersAll() {
    try {
        const users = await User.findAll({
            include: [
                Car,
                Task,
                Note,
            ]
        });
        return users;
    } catch (error) {
        console.log(error);
        throw new Error('there was an error getting users, cars, tasks, and notes');
    }
}

async function getUserByID(id) {
    try {
        await checkUser(id);
        const user = await User.findByPk(id);
        return user;
    } catch (error) {
        console.log(error);
        throw new Error("user had an error being found");
    }
}


async function getUserCarsByID(id) {
    try {
        await checkUser(id);
        const user = await User.findByPk(id, {
            include: [
                Car,
            ]
        });
        return user;
    } catch (error) {
        console.log(error);
        throw new Error("user with cars had an error being found");
    }
}

async function getUserTasksByID(id) {
    try {
        await checkUser(id);
        const user = await User.findByPk(id, {
            include: [
                Car,
                Task,
            ]
        });
        return user;
    } catch (error) {
        console.log(error);
        throw new Error("user with cars and tasks had an error being found");
    }
}

async function getUserAllByID(id) {
    try {
        await checkUser(id);
        const user = await User.findByPk(id, {
            include: [
                Car,
                Task,
                Note,
            ]
        });
        return user;
    } catch (error) {
        console.log(error);
        throw new Error("user with cars, tasks, and notes had an error being found");
    }
}

async function createUser(body) {
    try {
        const user = await User.create({
            username: body.username,
            email: body.email,
            password: body.password,
        });
        return user;
    } catch (error) {
        console.log(error);
        throw new Error("user had an error being created");
    }
}

async function updateUser(id, body) {
    try {
        let user = await checkUser(id);
        await user.update({
            username: body.username,
            email: body.price,
        });
        user = await checkUser(id);
        return user;
    } catch (error) {
        console.log(error);
        throw new Error("user had an error updating");
    }
}

async function updateUserPassword(id, body) {
    try {
        let user = await checkUser(id);
        await user.update({
            password: body.password
        });
        user = await checkUser(id);
        return user;
    } catch (error) {
        console.log(error);
        throw new Error("user had an error updating password");
    }
}

async function deleteUser(id) {
    try {
        const user = await checkUser(id);
        await user.destroy();
        console.log("deleted user");
    } catch (error) {
        console.log(error);
        throw new Error("user had an error being deleted");
    }
}

// async function deleteBulkUser(id) {
//     try {

//     } catch (error) {

//     }
// }

module.exports = {
    checkUser,
    getUsers,
    getUsersCars,
    getUsersTasks,
    getUsersAll,
    getUserByID,
    getUserCarsByID,
    getUserTasksByID,
    getUserAllByID,
    createUser,
    updateUser,
    updateUserPassword,
    deleteUser,
    // deleteBulkUser 

}
main

const { User, Car, Task, Note } = require('../models');

async function checkCar(id) {
    try {
        const car = await Car.findByPk(id);
        if (!product) {
            throw new Error("car does not exist");
        }
        return car;
    } catch (error) {
        console.log(error);
        throw Error(error);
    }
}

async function getCars() {
    try {
        const cars = await Car.findAll();
        return cars;
    } catch (error) {
        console.log(error);
        throw new Error('there was an error getting cars');
    }
}

async function getCarsTasks() {
    try {
        const cars = await Car.findAll({
            include: [
                Task,
            ]
        });
        return cars;
    } catch (error) {
        console.log(error);
        throw new Error('there was an error getting cars and tasks');
    }
}

async function getCarsAll() {
    try {
        const cars = await Car.findAll({
            include: [
                Car,
                Task,
                Note,
            ]
        });
        return cars;
    } catch (error) {
        console.log(error);
        throw new Error('there was an error getting cars, tasks, and notes');
    }
}

async function getCarByID(id) {
    try {
        await checkCar(id);
        const car = await Car.findByPk(id);
        return car;
    } catch (error) {
        console.log(error);
        throw new Error("car had an error being found");
    }
}

async function getCarTasksByID(id) {
    try {
        await checkCar(id);
        const car = await Car.findByPk(id, {
            include: [
                Task,
            ]
        });
        return car;
    } catch (error) {
        console.log(error);
        throw new Error("car with tasks had an error being found");
    }
}

async function getCarAllByID(id) {
    try {
        await checkCar(id);
        const car = await Car.findByPk(id, {
            include: [
                Task,
                Note,
            ]
        });
        return car;
    } catch (error) {
        console.log(error);
        throw new Error("car with tasks and notes had an error being found");
    }
}

async function createCar(body) {
    try {
        const car = await Car.create({
            make: body.username,
            model: body.email,
            year: body.password,
            mileage: body.mileage,
            user_id: body.user_id,
        });
        return car;
    } catch (error) {
        console.log(error);
        throw new Error("car had an error being created");
    }
}

async function updateCar(id, body) {
    try {
        let car = await checkCar(id);
        await car.update({
            make: body.username,
            model: body.email,
            year: body.password,
            mileage: body.mileage,
            user_id: body.user_id,
        });
        return car;
    } catch (error) {
        console.log(error);
        throw new Error("car had an error updating");
    }
}

async function deleteCar(id) {
    try {
        const car = await checkCar(id);
        await car.destroy();
        console.log("deleted car");
    } catch (error) {
        console.log(error);
        throw new Error("car had an error being deleted");
    }
}

async function deleteBulkCar(ids) {
    try {
        const cars = await Car.destroy({ where: { id: ids } });
        return cars;
    } catch (error) {
        console.log(error);
        throw new Error("cars had an error being deleted");
    }
}

module.exports = {
    checkCar,
    getCars,
    getCarByID,
    createCar,
    updateCar,
    deleteCar,
    deleteBulkCar

}
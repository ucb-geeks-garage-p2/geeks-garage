const { User, Car, Task } = require('../models');

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

async function getCars(req, res) {
    try {
        const cars = await Car.findAll({
            include: [
                User,
                Task
            ]
        })
    } catch (error) {
        
    }
}

async function getCarByID(req, res) {
    try {
        
    } catch (error) {
        
    }
}

async function createCar(req, res) {
    try {
        
    } catch (error) {
        
    }
}

async function updateCar(req, res) {
    try {
        
    } catch (error) {
        
    }
}

async function deleteCar(req, res) {
    try {
        
    } catch (error) {
        
    }
}

async function deleteBulkCar(req, res) {
    try {
        
    } catch (error) {
        
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
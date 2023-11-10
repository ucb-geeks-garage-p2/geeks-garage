const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Car extends Model { }

Car.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        make: {
            type: DataTypes.STRING,
        },
        model: {
            type: DataTypes.STRING,
        },
        mileage: {
            type: DataTypes.DECIMAL,
            validate: {
                isDecimal: true
            }
        },
        user_id: {
            type: DataTypes.UUID,
            references: {
                model: 'user',
                key: 'id',
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'car',
    }
);

module.exports = Car;

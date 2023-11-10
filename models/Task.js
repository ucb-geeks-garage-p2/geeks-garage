const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Task extends Model { }


Task.init(
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
        createdOn: {
            type: DataTypes.DATE(3),
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
        dueBy: {
            type: DataTypes.DATE(3),
          },
        car_id: {
            type: DataTypes.UUID,
            references: {
                model: 'car',
                key: 'id',
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'task',
    }
);

module.exports = Task;

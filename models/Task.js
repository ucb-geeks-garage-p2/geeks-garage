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
        task_name: {
            type: DataTypes.STRING,
        },
        created_on: {
            type: DataTypes.DATE(3),
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          },
        due_by: {
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

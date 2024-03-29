const { Model, Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../config/connection");

class Task extends Model {}

Task.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    task_name: {
      type: DataTypes.STRING,
    },
    created_on: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    due_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    car_id: {
      type: DataTypes.UUID,
      references: {
        model: "car",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "task",
  }
);

module.exports = Task;

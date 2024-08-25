const { DataTypes, Model } = require('sequelize');

const Employee = require('./employee.class');

const dbContext = require('../../Database/db-config');

class ComputedHour extends Model{};

ComputedHour.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    employeeIdentificationNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    payPerHour: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    totalWorkingHours: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
    },
    payForWorkingHours: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
    },
    totalTrainingHours: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
    },
    payForTrainingHours: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
    },
    totalBreakHours: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
    },

    // Foreign Keys
    employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Employee,
            key: 'id'
        }
    },

}, {
    sequelize: dbContext,
    modelName: 'ComputedHour',
    tableName: 'computedHours',
    timestamps: true,
});

module.exports = ComputedHour;
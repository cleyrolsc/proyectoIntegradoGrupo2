const { DataTypes, Model } = require('sequelize');
const { PaymentStatus } = require('../../Core/Abstractions/Enums');

const dbContext = require('../../Database/db-config');
const Employee = require('./employee.class');

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
    paymentStatus: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: PaymentStatus.Pending
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
    tableName: 'computedhours',
    timestamps: true,
});

module.exports = ComputedHour;
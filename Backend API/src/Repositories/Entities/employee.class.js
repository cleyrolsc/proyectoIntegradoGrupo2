const { DataTypes, Model } = require('sequelize');

const dbContext = require('../../Database/db-config');
const Department = require('./department.class');
const Position = require('./position.class');

class Employee extends Model {};

Employee.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    identificationNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    payPerHour: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
    },
    departmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Department,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    },
    supervisorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Employee,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    }, 
    positionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Position,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    }
}, {
    dbContext,
    modelName: 'Employee',
    tableName: 'employees',
    timestamps: true,
});

module.exports = Employee;
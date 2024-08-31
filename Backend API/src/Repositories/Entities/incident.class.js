const { DataTypes, Model } = require('sequelize');
const { IncidentStatus } = require('../../Core/Abstractions/Enums');

const dbContext = require('../../Database/db-config');
const ComputedHour = require('./computed-hour.class');
const Employee = require('./employee.class');

class Incident extends Model{};

Incident.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: IncidentStatus.Pending
    },
    employeeApproval: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: null
    },
    supervisorApproval: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: null
    },
    managerApproval: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: null
    },

    // Foreign Keys
    employeeId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Employee,
            key: 'id'
        }
    },
    supervisorId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Employee,
            key: 'id'
        }
    },
    computedHourId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: ComputedHour,
            key: 'id'
        }
    }
}, {
    sequelize: dbContext,
    modelName: 'Incident',
    tableName: 'incidents',
    timestamps: true,
    updatedAt: false
});

module.exports = Incident;
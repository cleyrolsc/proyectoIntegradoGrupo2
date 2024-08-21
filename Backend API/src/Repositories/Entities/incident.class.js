const { DataTypes, Model } = require('sequelize');
const { IncidentStatus } = require('../../Core/Abstractions/Enums');
const Employee = require('./employee.class');

const dbContext = require('../../Database/db-config');

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

    // Foreign Keys
    employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Employee,
            key: 'id'
        }
    },
    supervisorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Employee,
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
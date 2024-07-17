const { DataTypes, Model } = require('sequelize');

const dbContext = require('../../Database/db-config');
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

    // Foreign Keys
    employeeId: {
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
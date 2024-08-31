const { DataTypes, Model } = require('sequelize');

const dbContext = require('../../Database/db-config');
const Event = require('./event.class')
const Employee = require('./employee.class');

class Schedule extends Model {};

Schedule.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    eventDate: {
        type: DataTypes.BIGINT,
        allowNull: false
    },

    // Foreign Key
    eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Event,
            key: 'id',
        }
    },
    employeeId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Employee,
            key: 'id',
        }
    }
}, {
    sequelize: dbContext,
    modelName: 'Schedule',
    tableName: 'schedules',
    timestamps: true
});

module.exports = Schedule
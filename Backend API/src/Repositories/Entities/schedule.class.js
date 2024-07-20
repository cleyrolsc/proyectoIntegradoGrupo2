const { DataTypes, Model } = require('sequelize');

const dbContext = require('../../Database/db-config');
const Event = require('./event.class')
const Employee = require('./employee.class');

class Schedule extends Model {};

Schedule.init({
    eventId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Event,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    },
    employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Employee,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    },
    eventDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    dbContext,
    modelName: 'Schedule',
    tableName: 'schedules',
    timestamps: true
});

module.exports = Schedule
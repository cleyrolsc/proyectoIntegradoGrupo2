const { DataTypes, Model } = require('sequelize');

const dbContext = require('../../Database/db-config');
class ReportedHour extends Model{};

ReportedHour.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    eventDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    eventId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    dbContext,
    modelName: 'ReportedHour',
    tableName: 'reportedHours'
});

module.exports = ReportedHour;
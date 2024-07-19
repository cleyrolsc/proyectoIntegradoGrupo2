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

    // Foreign Keys
    employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Employee,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    }
}, {
    dbContext,
    modelName: 'ReportedHour',
    tableName: 'reportedHours',
    timestamps: false,
});

module.exports = ReportedHour;
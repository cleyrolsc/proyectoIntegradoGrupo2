const { DataTypes, Model } = require('sequelize');

const dbContext = require('../../Database/db-config');

class Event extends Model{};

Event.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize: dbContext,
    modelName: 'Event',
    tableName: 'events',
    timestamps: false
});

module.exports = Event;
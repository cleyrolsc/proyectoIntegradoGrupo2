const { DataTypes, Model } = require('sequelize');

const dbContext = require('../../Database/db-config');

class Position extends Model{};

Position.init({
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
    modelName: 'Position',
    tableName: 'positions',
    timestamps: false
});

module.exports = Position;
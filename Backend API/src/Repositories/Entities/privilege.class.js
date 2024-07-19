const { DataTypes, Model } = require('sequelize');

const dbContext = require('../../Database/db-config');
const { PrivilegeStatus } = require('../../Core/Abstractions/Enums');

class Privilege extends Model{};

Privilege.init({
    name: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    level: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: PrivilegeStatus.Active
    }
}, {
    sequelize: dbContext,
    modelName: 'Privilege',
    tableName: 'privileges',
    timestamps: true
});

module.exports = Privilege;
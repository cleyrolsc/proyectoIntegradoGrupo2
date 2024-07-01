const { DataTypes, Model } = require('sequelize');

const dbContext = require('../../Database/db-config');
const { UserType, UserStatus } = require("../../Core/Abstractions/Enums");

class User extends Model {};

User.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    employeeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: UserType.Agent
    },
    privilegeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    privilegeSuspended: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: UserStatus.Active
    },
    createdOn: {
        type: DataTypes.DATE,
        allowNull: false
    },
    modifiedOn: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    dbContext,
    modelName: 'User',
    tableName: 'users'
});

module.exports = User;
const { DataTypes, Model } = require('sequelize');
const { UserType, UserStatus } = require("../../Core/Abstractions/Enums");

const dbContext = require('../../Database/db-config');
const Employee = require('./employee.class');
const Privilege = require('./privilege.class');

class User extends Model {};

User.init({
    username: {
        type: DataTypes.STRING,
        primaryKey: true
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
    privilegeSuspended: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: UserStatus.Active
    },

    // Foreign Keys
    employeeId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Employee,
            key: 'id'
        }
    },
    privilegeId: {
        type: DataTypes.TEXT,
        allowNull: false,
        references: {
            model: Privilege,
            key: 'name'
        }
    },
}, {
    sequelize: dbContext,
    modelName: 'User',
    tableName: 'users',
    timestamps: true
});

module.exports = User;
const { DataTypes, Model } = require('sequelize');

const dbContext = require('../../Database/db-config');
const { UserType, UserStatus } = require("../../Core/Abstractions/Enums");
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
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Employee,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    },
    privilegeId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Privilege,
            key: 'name',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    },
}, {
    dbContext,
    modelName: 'User',
    tableName: 'users',
    timestamps: true
});

module.exports = User;
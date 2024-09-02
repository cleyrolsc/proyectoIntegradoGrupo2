const { DataTypes, Model } = require("sequelize");
const { PayrollDisputeStatus } = require("../../Core/Abstractions/Enums");

const dbContext = require("../../Database/db-config");
const Payroll = require("./payroll.class");
const Employee = require("./employee.class");

class PayrollDispute extends Model { }

PayrollDispute.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        employeeApproval: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null,
        },
        supervisorApproval: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null,
        },
        managerApproval: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: null,
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: PayrollDisputeStatus.Pending,
        },

        // Foreign Keys
        employeeId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Employee,
                key: "id",
            },
        },
        payrollId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Payroll,
                key: "id",
            },
        },
        supervisorId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Employee,
                key: "id",
            },
        },
        managerId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Employee,
                key: "id",
            },
        },
    },
    {
        sequelize: dbContext,
        modelName: "PayrollDispute",
        tableName: "payroll_disputes",
        timestamps: true,
    }
);

module.exports = PayrollDispute;

const { DataTypes, Model } = require('sequelize');

const dbContext = require('../../Database/db-config');

class Department extends Model{};

Department.init({
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
    dbContext,
    modelName: 'Department',
    tableName: 'departments',
    timestamps: false,
});

module.exports = Department;


const { BadRequestError } = require('../Core/Abstractions/Exceptions');
const { isNotNullNorUndefined, isNullOrUndefined, isNullUndefinedOrEmpty } = require('../Core/Utils/null-checker.util');
const { Op } = require('sequelize');

const Payroll = require('./Entities/payroll.class');

const createPayrollAsync = (employeeId, payPerHour, startDate, endDate, totalWorkingHours, totalTrainingHours, totalBreakHours) => {
    if (isNullUndefinedOrEmpty(employeeId)) {
        throw new BadRequestError('Employee id cannot be undefined');
    }

    return Payroll.create({
        employeeId,
        payPerHour,
        startDate,
        endDate,
        totalWorkingHours,
        payForWorkingHours: totalWorkingHours * payPerHour,
        totalTrainingHours,
        payForTrainingHours: totalTrainingHours * payPerHour,
        totalBreakHours
    });
};

const getPayrollByIdAsync = async (id) => {
    let payroll = await Payroll.findByPk(id);
    if (isNullOrUndefined(payroll)) {
        return undefined;
    }

    return payroll;
};

const getPayrollsAsync = (paymentStatus = undefined, startDate = undefined, endDate = undefined, skip = 0, limit = 10, orderBy = 'DESC') => {
    let where = {};
    if (isNotNullNorUndefined(startDate) && isNotNullNorUndefined(endDate)) {
        where = {
            createdAt: {
                [Op.between]: [startDate, endDate]
            }
        }
    }
    else if (isNotNullNorUndefined(startDate)) {
        where.createdAt = startDate
    }
    else if (isNotNullNorUndefined(endDate)) {
        where.createdAt = endDate
    }

    if (isNotNullNorUndefined(paymentStatus)) {
        where.paymentStatus = paymentStatus
    }

    return Payroll.findAndCountAll({
        where,
        order: [['id', orderBy]],
        skip,
        limit
    });
};

const getPayrollsByEmployeeIdAsync = (employeeId, startDate = undefined, endDate = undefined, paymentStatus = undefined, skip = 0, limit = 10, orderBy = 'DESC') => {
    let where = {
        employeeId
    };

    if (isNotNullNorUndefined(startDate)) {
        where.startDate = startDate
    }

    if (isNotNullNorUndefined(endDate)) {
        where.endDate = endDate
    }

    if (isNotNullNorUndefined(paymentStatus)) {
        where.paymentStatus = paymentStatus
    }

    return Payroll.findAndCountAll({
        where,
        order: [['id', orderBy]],
        skip,
        limit
    });
};

const updatePayrollAsync = async (id, totalWorkingHours = undefined, totalTrainingHours = undefined, totalBreakHours = undefined, paymentStatus = undefined) => {
    let payroll = await Payroll.findByPk(id);
    if (isNullOrUndefined(payroll)) {
        return undefined;
    }

    if (isNullOrUndefined(totalWorkingHours) && isNullOrUndefined(totalTrainingHours) && isNullOrUndefined(totalBreakHours) && isNullOrUndefined(totalBreakHours) && isNullOrUndefined(paymentStatus)) {
        return payroll
    }

    if (isNotNullNorUndefined(totalWorkingHours)) {
        payroll.totalWorkingHours = totalWorkingHours;
        payroll.payForWorkingHours = totalWorkingHours * payroll.payPerHour;
    }

    if (isNotNullNorUndefined(totalTrainingHours)) {
        payroll.totalTrainingHours = totalTrainingHours;
        payroll.payForTrainingHours = totalTrainingHours * payroll.payPerHour;
    }

    payroll.totalTrainingHours = totalTrainingHours ?? payroll.totalTrainingHours;
    payroll.paymentStatus = paymentStatus ?? payroll.paymentStatus;
    payroll.updatedAt = new Date();

    await payroll.save();

    return payroll;
};

module.exports = {
    createPayrollAsync,
    getPayrollByIdAsync,
    getPayrollsAsync,
    getPayrollsByEmployeeIdAsync,
    updatePayrollAsync
};
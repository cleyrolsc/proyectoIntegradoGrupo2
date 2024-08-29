

const { BadRequestError } = require('../Core/Abstractions/Exceptions');
const { isNotNullNorUndefined, isNotNullUndefinedNorEmpty, isNullOrUndefined } = require('../Core/Utils/null-checker.util');
const { Op } = require('sequelize');

const ComputedHour = require('./Entities/computed-hour.class');

const createComputedHourAsync = (employeeId, employeeIdentificationNumber, payPerHour, startDate, endDate,
    totalWorkingHours, totalTrainingHours, totalBreakHours) => {
    if (isNotNullNorUndefined(employeeId)) {
        throw BadRequestError('Employee id cannot be undefined');
    }

    if (isNotNullUndefinedNorEmpty(employeeIdentificationNumber)) {
        throw BadRequestError('Employee identification number cannot be undefined');
    }

    return ComputedHour.create({
        employeeId,
        employeeIdentificationNumber,
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

const getComputedHourByIdAsync = async (id) => {
    let computedHour = await ComputedHour.findByPk(id);
    if(isNullOrUndefined(computedHour)){
        return undefined;
    }

    return computedHour;
};

const getComputedHoursAsync = (startDate, endDate = new Date(), skip = 0, limit = 10, orderBy = 'DESC') => ComputedHour.findAndCountAll({
    where: {
        createdAt: {
            [Op.between]: [startDate, endDate]
        }
    },
    order: [['id', orderBy]],
    skip,
    limit
});

const getComputedHoursByEmployeeIdAsync = (employeeId, startDate, endDate = new Date(), paymentStatus = undefined, skip = 0, limit = 10, orderBy = 'DESC') => {
    let where = {
        employeeId,
        createdAt: {
            [Op.between]: [startDate, endDate]
        }
    };

    if(isNotNullNorUndefined(paymentStatus)) {
        where.paymentStatus = paymentStatus
    }
    
    return ComputedHour.findAndCountAll({
        where,
        order: [['id', orderBy]],
        skip,
        limit
    });
};

const updateComputedHourAsync = async (id, totalWorkingHours = undefined, totalTrainingHours = undefined, totalBreakHours = undefined, paymentStatus = undefined) => {
    let computedHour = await ComputedHour.findByPk(id);
    if(isNullOrUndefined(computedHour)){
        return undefined;
    }
    
    if (isNullOrUndefined(totalWorkingHours) && isNullOrUndefined(totalTrainingHours) && isNullOrUndefined(totalBreakHours) && paymentStatus(totalBreakHours)) {
        return computedHour
    }

    if(isNotNullNorUndefined(totalWorkingHours)) {
        computedHour.totalWorkingHours = totalWorkingHours;
        computedHour.payForWorkingHours = totalWorkingHours * computedHour.payPerHour;
    }

    if(isNotNullNorUndefined(totalTrainingHours)) {
        computedHour.totalTrainingHours = totalTrainingHours;
        computedHour.payForTrainingHours = totalTrainingHours * computedHour.payPerHour;
    }

    computedHour.totalTrainingHours = totalTrainingHours ?? computedHour.totalTrainingHours;
    computedHour.paymentStatus = paymentStatus ?? computedHour.paymentStatus;

    await computedHour.save();

    return computedHour;
};

module.exports = {
    createComputedHourAsync,
    getComputedHourByIdAsync,
    getComputedHoursAsync,
    getComputedHoursByEmployeeIdAsync,
    updateComputedHourAsync
};
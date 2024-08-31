

const { BadRequestError } = require('../Core/Abstractions/Exceptions');
const { isNotNullNorUndefined, isNullOrUndefined, isNullUndefinedOrEmpty } = require('../Core/Utils/null-checker.util');
const { Op } = require('sequelize');

const ComputedHour = require('./Entities/computed-hour.class');

const createComputedHourAsync = (employeeId, payPerHour, startDate, endDate, totalWorkingHours, totalTrainingHours, totalBreakHours) => {
    if (isNullUndefinedOrEmpty(employeeId)) {
        throw new BadRequestError('Employee id cannot be undefined');
    }

    return ComputedHour.create({
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

const getComputedHourByIdAsync = async (id) => {
    let computedHour = await ComputedHour.findByPk(id);
    if(isNullOrUndefined(computedHour)){
        return undefined;
    }

    return computedHour;
};

const getComputedHoursAsync = (paymentStatus = undefined, startDate = undefined, endDate = undefined, skip = 0, limit = 10, orderBy = 'DESC') => {
    let where = {};
    if(isNotNullNorUndefined(startDate) && isNotNullNorUndefined(endDate)) {
        where = {
            createdAt: {
                [Op.between]: [startDate, endDate]
            }
        }
    }
    else if(isNotNullNorUndefined(startDate)) {
        where.createdAt = startDate
    }
    else if(isNotNullNorUndefined(endDate)) {
        where.createdAt = endDate
    }
    
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

const getComputedHoursByEmployeeIdAsync = (employeeId, startDate = undefined, endDate = undefined, paymentStatus = undefined, skip = 0, limit = 10, orderBy = 'DESC') => {
    let where = {
        employeeId
    };

    if(isNotNullNorUndefined(startDate)) {
        where.startDate = startDate
    }

    if(isNotNullNorUndefined(endDate)) {
        where.endDate = endDate
    }

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
    computedHour.updatedAt = new Date();

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
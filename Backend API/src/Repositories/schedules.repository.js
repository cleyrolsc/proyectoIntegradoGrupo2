const { isNullOrUndefined } = require('../Core/Utils/null-checker.util');
const { Op } = require('sequelize');
const { BadRequestError } = require('../Core/Abstractions/Exceptions');

const Schedule = require("./Entities/schedule.class");

const createScheduleAsync = ({ eventId, employeeId, eventDate }) => {
    return Schedule.create({
        eventId, 
        employeeId, 
        eventDate
    });
}

const getSchedulesAsync = (startDate = new Date(Date.now() - 86400000).getTime(), endDate = new Date().getTime(), skip = 0, limit = 100, orderBy = 'ASC') => {
    if (startDate > endDate){
        throw new BadRequestError('Start date cannot be at a later date than end date');
    }

    return Schedule.findAndCountAll({
        where: {
            eventDate: {[Op.between]: [startDate, endDate]}
        },
        order: [
            ['employeeId', orderBy],
            ['eventDate', 'DESC']
        ],
        offset: skip,
        limit
    });
}

const getSchedulesByEmployeeIdAsync = async (employeeId, startDate = new Date(Date.now() - 86400000).getTime(), endDate = new Date().getTime(), skip = 0, limit = 100, orderBy = 'DESC') => {
    if (startDate > endDate){
        throw new BadRequestError('Start date cannot be at a later date than end date');
    }
    
    let schedules = await Schedule.findAndCountAll({
        where: {
            employeeId,
            eventDate: {[Op.between]: [startDate, endDate]}
        },
        order: [
            ['eventDate', orderBy]
        ],
        offset: skip,
        limit
    });

    if (isNullOrUndefined(schedules)) {
        return undefined;
    }

    return schedules;
}

const getScheduleByEventIdAsync = async (eventId, startDate = new Date(Date.now() - 86400000).getTime(), endDate = new Date().getTime(), skip = 0, limit = 100, orderBy = 'ASC') => {
    if (startDate > endDate){
        throw new BadRequestError('Start date cannot be at a later date than end date');
    }
    
    let schedules = await Schedule.findAndCountAll({
        where: {
            eventId,
            eventDate: {[Op.between]: [startDate, endDate]}
        },
        order: [
            ['eventDate', 'DESC']
        ],
        offset: skip,
        limit
    });

    if (isNullOrUndefined(schedules)) {
        return undefined;
    }

    return schedules;
}

module.exports = {
    createScheduleAsync,
    getSchedulesByEmployeeIdAsync,
    getSchedulesAsync,
    getScheduleByEventIdAsync,
    getSchedulesByEmployeeIdAsync
}





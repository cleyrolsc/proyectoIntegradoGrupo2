const { isNullOrUndefined } = require('../Core/Utils/null-checker.util');
const { Op } = require('sequelize');

const Schedule = require("./Entities/schedule.class");

const createScheduleAsync = ({ eventId, employeeId, eventDate }) => {
    return Schedule.create({
        eventId, 
        employeeId, 
        eventDate
    });
}

const getAllSchedulesAsync = (skip = 0, limit = 10, orderBy = 'ASC') => Schedule.findAndCountAll({
    order: [
        ['eventDate', orderBy]
        ['employeeId', orderBy]
    ],
    offset: skip,
    limit
});

const getSchedulesByEmployeeIdAsync = async (employeeId, skip = 0, limit = 10, orderBy = 'ASC') => {
    let schedules = await Schedule.findAndCountAll({
        where: {
            employeeId,
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

const getSchedulesByEventIdAsync = async (eventId, skip = 0, limit = 10, orderBy = 'ASC') => {
    let schedules = await Schedule.findAndCountAll({
        where: {
            eventId,
        },
        order: [
            ['eventDate', orderBy]
            ['employeeId', orderBy]
        ],
        offset: skip,
        limit
    });

    if (isNullOrUndefined(schedules)) {
        return undefined;
    }

    return schedules;
}

const getScheduleByDateRangeAsync = (startDate, endDate, skip = 0, limit = 10, orderBy = 'ASC') => Schedule.findAndCountAll({
    where: {
        eventDate: {[Op.between]: [startDate, endDate]}
    },
    order: [
        ['eventDate', orderBy]
        ['employeeId', orderBy]
    ],
    offset: skip,
    limit
});

const getEmployeeSchedulesByDateRangeAsync = async (employeeId, startDate = new Date(Date.now() - 86400000), endDate = new Date(), skip = 0, limit = 10, orderBy = 'ASC') => {
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

const getEventsScheduleByDateRangeAsync = async (eventId, startDate, endDate, skip = 0, limit = 10, orderBy = 'ASC') => {
    let schedules = await Schedule.findAndCountAll({
        where: {
            eventId,
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

module.exports = {
    createScheduleAsync,
    getAllSchedulesAsync,
    getSchedulesByEmployeeIdAsync,
    getSchedulesByEventIdAsync,
    getScheduleByDateRangeAsync,
    getEventsScheduleByDateRangeAsync,
    getEmployeeSchedulesByDateRangeAsync
}





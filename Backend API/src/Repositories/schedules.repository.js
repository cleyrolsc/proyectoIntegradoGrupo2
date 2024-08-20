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

const getSchedulesAsync = (startDate = new Date(Date.now() - 86400000), endDate = new Date(), skip = 0, limit = 100, orderBy = 'ASC') => Schedule.findAndCountAll({
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

const getSchedulesByEmployeeIdAsync = async (employeeId, startDate = new Date(Date.now() - 86400000), endDate = new Date(), skip = 0, limit = 100, orderBy = 'ASC') => {
    let schedules = await Schedule.findAndCountAll({
        where: {
            employeeId,
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

const getScheduleByEventIdAsync = async (eventId, startDate = new Date(Date.now() - 86400000), endDate = new Date(), skip = 0, limit = 100, orderBy = 'ASC') => {
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





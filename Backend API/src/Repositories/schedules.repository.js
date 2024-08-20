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
        from: {
            $between: [startDate, endDate]
        }
    },
    order: [
        ['eventDate', orderBy]
        ['employeeId', orderBy]
    ],
    offset: skip,
    limit
});

const getEmployeeSchedulesByDateRangeAsync = async (employeeId, startDate, endDate, skip = 0, limit = 10, orderBy = 'ASC') => {
    let schedules = await Schedule.findAndCountAll({
        where: {
            employeeId,
            from: {
                $between: [startDate, endDate]
            }
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
            from: {
                $between: [startDate, endDate]
            }
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





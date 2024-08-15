const { isNullOrUndefined } = require("../Core/Utils/null-checker.util");

const Schedule = require("./Entities/schedule.class");

const createScheduleAsync = ({ eventId, employeeId, eventDate }) => {
    return Schedule.create({
        eventId, 
        employeeId, 
        eventDate
    });
}

const getAllSchedules = async (skip = 0, limit = 10, orderBy = 'ASC') => Schedule.findAndCountAll({
    order: [
        ['employeeId', orderBy]
    ],
    offset: skip,
    limit
});

const getSchedulesByEmployeeId = async employeeId => {
    let schedules = await Schedule.findAll({
        where: {
            employeeId,
        }
    });

    if (isNullOrUndefined(schedules)) {
        return undefined;
    }

    return schedules;
}

const getSchedulesByEventId = async eventId => {
    let schedules = await Schedule.findAll({
        where: {
            eventId,
        }
    });


    if (isNullOrUndefined(schedules)) {
        return undefined;
    }

    return schedules;
}

const getScheduleByDateRange = async (startDate, endDate, skip = 0, limit = 10, orderBy = 'ASC') => await Schedule.findAndCountAll({
    where: {
        from: {
            $between: [startDate, endDate]
        }
    },
    order: [
        'employeeId', orderBy
    ],
    offset: skip,
    limit
});

const getEmployeeSchedulesByDateRange = async (employeeId, startDate, endDate) => {
    let schedules = await Schedule.findAll({
        where: {
            employeeId,
            from: {
                $between: [startDate, endDate]
            }
        }
    });

    if (isNullOrUndefined(schedules)) {
        return undefined;
    }

    return schedules;
}

const getEventsScheduleByDateRange = async (eventId, startDate, endDate) => {
    let schedules = await Schedule.findAll({
        where: {
            eventId,
            from: {
                $between: [startDate, endDate]
            }
        }
    });

    if (isNullOrUndefined(schedules)) {
        return undefined;
    }

    return schedules;
}

module.exports = {
    createScheduleAsync,
    getAllSchedules,
    getSchedulesByEmployeeId,
    getSchedulesByEventId,
    getScheduleByDateRange,
    getEventsScheduleByDateRange,
    getEmployeeSchedulesByDateRange
}





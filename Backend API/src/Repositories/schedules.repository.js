const { isNullOrUndefined } = require("../Core/Utils/null-checker.util");
// const { NotImplementedError } = require("../Core/Abstractions/Exceptions");

const Schedule = require("./Entities/schedule.class");

const createScheduleAsync = ({ eventId, employeeId, eventDate }) => {
    return Schedule.create({
        eventId, 
        employeeId, 
        eventDate
    });
}

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

const getScheduleByDateRange = async (startDate, endDate) => {
    let schedules = await Schedule.findAll({
        where: {
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
    getSchedulesByEmployeeId,
    getSchedulesByEventId,
    getScheduleByDateRange
}





const { BadRequestError } = require("../../Core/Abstractions/Exceptions");
const { isNullOrUndefined } = require("../../Core/Utils/null-checker.util");
const { SchedulesRepository, UsersRepository, EventsRepository } = require('../../Repositories/index');

const reportEventTime = async (eventDetails) => {
    const { eventId, employeeId } = eventDetails;

    const employeeIdExist = await UsersRepository.getUserByEmployeeId(employeeId);
    const eventIdExist = await EventsRepository.getEventByIdAsync(eventId);

    if (isNullOrUndefined(employeeIdExist) || isNullOrUndefined(eventIdExist)) {
        throw new BadRequestError("Either Employee Id or Event Id do not exist.");
    }

    const currentDate = new Date();

    const newEvent = await SchedulesRepository.createScheduleAsync({eventId, employeeId, currentDate})

    if (isNullOrUndefined(newEvent)) {
        throw new FatalError("New event was not created");
    }

    return newEvent;
}

const getAllSchedules = async () => {
    const schedules = await SchedulesRepository.getAllSchedules();

    if (isNullOrUndefined(schedules)) {
        throw new FatalError("New event was not created");
    }

    return schedules
}

const getAllEmployeeSchedules = async (employeeId) => {
    const schedules = await SchedulesRepository.getSchedulesByEmployeeId(employeeId);

    if (isNullOrUndefined(schedules)) {
        throw new FatalError("New event was not created");
    }

    return schedules
}

const getAllEventSchedules = async (eventId) => {
    const schedules = await SchedulesRepository.getSchedulesByEventId(eventId);

    if (isNullOrUndefined(schedules)) {
        throw new FatalError("New event was not created");
    }

    return schedules
}

const getAllSchedulesByDateRange = async (startDate, endDate) => {
    const schedules = await SchedulesRepository.getScheduleByDateRange(startDate, endDate);

    if (isNullOrUndefined(schedules)) {
        throw new FatalError("New event was not created");
    }

    return schedules
}

const getAllEmployeeScheduleByDateRange = async (employeeId, startDate, endDate) => {
    const schedules = await SchedulesRepository.getEmployeeSchedulesByDateRange(employeeId, startDate, endDate);

    if (isNullOrUndefined(schedules)) {
        throw new FatalError("New event was not created");
    }

    return schedules
}

const getAllEventSchedulesByDateRange = async (eventId, startDate, endDate) => {
    const schedules = await SchedulesRepository.getEventsScheduleByDateRange(eventId, startDate, endDate);

    if (isNullOrUndefined(schedules)) {
        throw new FatalError("New event was not created");
    }

    return schedules
}

module.exports = {
    reportEventTime,
    getAllSchedules,
    getAllSchedulesByDateRange,
    getAllEmployeeSchedules,
    getAllEmployeeScheduleByDateRange,
    getAllEventSchedules,
    getAllEventSchedulesByDateRange
}

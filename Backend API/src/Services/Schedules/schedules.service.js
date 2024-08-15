const { PaginatedResponse } = require("../../Core/Abstractions/Contracts/Responses");
const { formatPaginatedResponse } = require("../../Core/Utils/response-formatter.util");
const { BadRequestError } = require("../../Core/Abstractions/Exceptions");
const { isNullOrUndefined, isListEmpty } = require("../../Core/Utils/null-checker.util");
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

const getAllSchedules = async (currentPage = 1, itemsPerPage = 100, orderBy = "ASC") => {
    let skip = (currentPage - 1) * itemsPerPage

    const {count, rows: schedules} = await SchedulesRepository.getAllSchedules(skip, itemsPerPage, orderBy);

    if (isListEmpty(schedules)) {
        throw new PaginatedResponse()
    }

    return formatPaginatedResponse(currentPage, itemsPerPage, schedules, count);
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

const getAllSchedulesByDateRange = async (startDate, endDate, currentPage = 1, itemsPerPage = 100, orderBy = "ASC") => {
    let skip = (currentPage - 1) * itemsPerPage

    const {count, rows: schedules} = await SchedulesRepository.getScheduleByDateRange(startDate, endDate, skip, itemsPerPage, orderBy);

    if (isListEmpty(schedules)) {
        throw new PaginatedResponse()
    }

    return formatPaginatedResponse(currentPage, itemsPerPage, schedules, count);
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

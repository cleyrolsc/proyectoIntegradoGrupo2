const { PaginatedResponse } = require("../../Core/Abstractions/Contracts/Responses");
const { formatPaginatedResponse } = require("../../Core/Utils/response-formatter.util");
const { BadRequestError, NotFoundError, FatalError } = require("../../Core/Abstractions/Exceptions");
const { isNullOrUndefined, isListEmpty } = require("../../Core/Utils/null-checker.util");

const { SchedulesRepository, EventsRepository, EmployeesRepository } = require('../../Repositories/index');

const reportEventTimeAsync = async (eventDetails) => {
    const { eventId, employeeId } = eventDetails;

    const employee = await EmployeesRepository.getEmployeeByIdAsync(employeeId);
    if (isNullOrUndefined(employee)) {
        throw new NotFoundError(`Employee with id ${employeeId} does not exist.`);
    }

    const event = await EventsRepository.getEventByIdAsync(eventId);
    if (isNullOrUndefined(event)) {
        throw new BadRequestError(`Event with id ${eventId} is invalid.`);
    }

    const currentDate = new Date();
    const newEvent = await SchedulesRepository.createScheduleAsync({eventId, employeeId, eventDate: currentDate})

    if (isNullOrUndefined(newEvent)) {
        throw new FatalError("New event was not created");
    }

    return {
        id: newEvent.id,
        eventId: event.id,
        event: event.description,
        employeeId: employee.id,
        employee: `${employee.lastName} ${employee.firstName}`
    };
}

const getAllSchedulesAsync = async (currentPage = 1, itemsPerPage = 100, orderBy = "ASC") => {
    let skip = (currentPage - 1) * itemsPerPage
    const {count, rows: schedules} = await SchedulesRepository.getAllSchedulesAsync(skip, itemsPerPage, orderBy);

    if (isListEmpty(schedules)) {
        throw new PaginatedResponse()
    }

    return formatPaginatedResponse(currentPage, itemsPerPage, schedules, count);
}

const getAllEmployeeSchedulesAsync = async (employeeId, currentPage = 1, itemsPerPage = 100, orderBy = "ASC") => {
    let skip = (currentPage - 1) * itemsPerPage
    const {count, rows: schedules} = await SchedulesRepository.getSchedulesByEmployeeIdAsync(employeeId, skip, itemsPerPage, orderBy);

    if (isNullOrUndefined(schedules)) {
        throw new PaginatedResponse();
    }

    return formatPaginatedResponse(currentPage, itemsPerPage, schedules, count);
}

const getAllEventSchedulesAsync = async (eventId, currentPage = 1, itemsPerPage = 100, orderBy = "ASC") => {
    let skip = (currentPage - 1) * itemsPerPage
    const {count, rows: schedules} = await SchedulesRepository.getSchedulesByEventIdAsync(eventId, skip, itemsPerPage, orderBy);

    if (isNullOrUndefined(schedules)) {
        throw new PaginatedResponse();
    }

    return formatPaginatedResponse(currentPage, itemsPerPage, schedules, count);
}

const getAllSchedulesByDateRangeAsync = async (startDate = new Date(Date.now() - 86400000), endDate = new Date(), currentPage = 1, itemsPerPage = 100, orderBy = "ASC") => {
    let skip = (currentPage - 1) * itemsPerPage
    const {count, rows: schedules} = await SchedulesRepository.getScheduleByDateRangeAsync(startDate, endDate, skip, itemsPerPage, orderBy);

    if (isListEmpty(schedules)) {
        throw new PaginatedResponse()
    }

    return formatPaginatedResponse(currentPage, itemsPerPage, schedules, count);
}

const getAllEmployeeScheduleByDateRangeAsync = async (employeeId, startDate = new Date(Date.now() - 86400000), endDate = new Date(), currentPage = 1, itemsPerPage = 100, orderBy = "ASC") => {
    const employee = await EmployeesRepository.getEmployeeByIdAsync(employeeId);
    if (isNullOrUndefined(employee)) {
        throw new NotFoundError(`Employee with id ${employeeId} does not exist.`);
    }
    
    let skip = (currentPage - 1) * itemsPerPage
    const {count, rows: schedules} = await SchedulesRepository.getEmployeeSchedulesByDateRangeAsync(employeeId, startDate, endDate, skip, itemsPerPage, orderBy);

    if (isNullOrUndefined(schedules)) {
        throw new PaginatedResponse()
    }

    let { rows: events } = await EventsRepository.getEventsAsync(0, 1000);
    let eventDescriptions = Object.assign({}, ...events.map((x) => ({[x.id]: x.description})));

    let scheduleModels = [];
    schedules.forEach((entity) => {
        let { id, employeeId, eventDate, eventId} = entity;
        scheduleModels.push({
            id,
            eventDate,
            eventId,
            event: eventDescriptions[id],
            employeeId,
            employee: `${employee.lastName} ${employee.firstName}`
        });
    });

    return formatPaginatedResponse(currentPage, itemsPerPage, scheduleModels, count);
}

const getAllEventSchedulesAsyncByDateRangeAsync = async (eventId, startDate = new Date(Date.now() - 86400000), endDate = new Date(), currentPage = 1, itemsPerPage = 100, orderBy = "ASC") => {
    const event = await EventsRepository.getEventByIdAsync(eventId);
    if (isNullOrUndefined(event)) {
        throw new BadRequestError(`Event with id ${eventId} is invalid.`);
    }
    
    let skip = (currentPage - 1) * itemsPerPage
    const {count, rows: schedules} = await SchedulesRepository.getEventsScheduleByDateRangeAsync(eventId, startDate, endDate, skip, itemsPerPage, orderBy);

    if (isNullOrUndefined(schedules)) {
        throw new PaginatedResponse()
    }

    let scheduleModels = [];
    schedules.forEach((entity) => {
        let { id, employeeId, eventDate, eventId} = entity;
        scheduleModels.push({
            id,
            eventDate,
            eventId,
            event: event.description,
            employeeId
        });
    });

    return formatPaginatedResponse(currentPage, itemsPerPage, scheduleModels, count);
}

module.exports = {
    reportEventTimeAsync,
    getAllSchedulesAsync,
    getAllSchedulesByDateRangeAsync,
    getAllEmployeeSchedulesAsync,
    getAllEmployeeScheduleByDateRangeAsync,
    getAllEventSchedulesAsync,
    getAllEventSchedulesAsyncByDateRangeAsync
}

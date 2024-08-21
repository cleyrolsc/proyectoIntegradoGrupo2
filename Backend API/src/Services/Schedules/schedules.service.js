const { PaginatedResponse } = require("../../Core/Abstractions/Contracts/Responses");
const { formatPaginatedResponse } = require("../../Core/Utils/response-formatter.util");
const { BadRequestError, NotFoundError, FatalError } = require("../../Core/Abstractions/Exceptions");
const { isNullOrUndefined, isListEmpty } = require("../../Core/Utils/null-checker.util");

const { SchedulesRepository, EventsRepository, EmployeesRepository } = require('../../Repositories/index');

const reportHoursAsync = async (eventDetails) => {
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
        eventDate: newEvent.eventDate,
        eventId: event.id,
        event: event.description,
        employeeId: employee.id,
        employee: `${employee.lastName} ${employee.firstName}`
    };
}

const getHoursAsync = async (startDate = new Date(Date.now() - 86400000), endDate = new Date(), currentPage = 1, itemsPerPage = 100, orderBy = "ASC") => {
    if (startDate > endDate){
        throw new BadRequestError('Start date cannot be at a later date than end date');
    }
    
    let skip = (currentPage - 1) * itemsPerPage
    const {count, rows: schedules} = await SchedulesRepository.getSchedulesAsync(startDate, endDate, skip, itemsPerPage, orderBy);

    if (isListEmpty(schedules)) {
        throw new PaginatedResponse()
    }

    let eventDescriptions = await getEventDescriptionsAsync();

    let scheduleModels = [];
    schedules.forEach((entity) => {
        let { id, employeeId, eventDate, eventId} = entity;
        scheduleModels.push({
            id,
            eventDate,
            eventId,
            event: eventDescriptions[eventId],
            employeeId
        });
    });

    return formatPaginatedResponse(currentPage, itemsPerPage, scheduleModels, count);
}

async function getEventDescriptionsAsync() {
    let { rows: events } = await EventsRepository.getEventsAsync(0, 1000);
    let eventDescriptions = Object.assign({}, ...events.map((x) => ({ [x.id]: x.description })));
    return eventDescriptions;
}

const getEmployeeHoursAsync = async (employeeId, startDate = new Date(Date.now() - 86400000), endDate = new Date(), currentPage = 1, itemsPerPage = 100, orderBy = "ASC") => {
    const employee = await EmployeesRepository.getEmployeeByIdAsync(employeeId);
    if (isNullOrUndefined(employee)) {
        throw new NotFoundError(`Employee with id ${employeeId} does not exist.`);
    }

    if (startDate > endDate){
        throw new BadRequestError('Start date cannot be at a later date than end date');
    }
    
    let skip = (currentPage - 1) * itemsPerPage
    const {count, rows: schedules} = await SchedulesRepository.getSchedulesByEmployeeIdAsync(employeeId, startDate, endDate, skip, itemsPerPage, orderBy);

    if (isNullOrUndefined(schedules)) {
        throw new PaginatedResponse()
    }

    let eventDescriptions = await getEventDescriptionsAsync();

    let scheduleModels = [];
    schedules.forEach((entity) => {
        let { id, employeeId, eventDate, eventId} = entity;
        scheduleModels.push({
            id,
            eventDate,
            eventId,
            event: eventDescriptions[eventId],
            employeeId,
            employee: `${employee.lastName} ${employee.firstName}`
        });
    });

    return formatPaginatedResponse(currentPage, itemsPerPage, scheduleModels, count);
}

const getHoursByEventAsync = async (eventId, startDate = new Date(Date.now() - 86400000), endDate = new Date(), currentPage = 1, itemsPerPage = 100, orderBy = "ASC") => {
    const event = await EventsRepository.getEventByIdAsync(eventId);
    if (isNullOrUndefined(event)) {
        throw new BadRequestError(`Event with id ${eventId} is invalid.`);
    }

    if (startDate > endDate){
        throw new BadRequestError('Start date cannot be at a later date than end date');
    }
    
    let skip = (currentPage - 1) * itemsPerPage
    const {count, rows: schedules} = await SchedulesRepository.getScheduleByEventIdAsync(eventId, startDate, endDate, skip, itemsPerPage, orderBy);

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
    reportHoursAsync,
    getHoursAsync,
    getEmployeeHoursAsync,
    getHoursByEventAsync
}
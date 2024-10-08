const { BadRequestError } = require('../../Core/Abstractions/Exceptions');
const { isNullOrUndefined, isNullUndefinedOrEmpty, isNotNullNorUndefined } = require('../../Core/Utils/null-checker.util');
const { extractPaginationElements, extractDateRange, fetchEmployeeIdWithAuthTokenAsync } = require('../../Core/Utils/request-element-extractor.util');
const { created, ok } = require('../../Core/Abstractions/Contracts/HttpResponses/http-responses');

const SchedulesService = require('../../Services/Schedules/schedules.service');

const registerMyHoursAsync = async (request, response, next) => {
  try {
    let { eventIds } = request.body;
    let employeeId = await fetchEmployeeIdWithAuthTokenAsync(request);
    let schedules = await SchedulesService.reportHoursAsync({ eventIds, employeeId });

    created(response, request.originalUrl, schedules);
  } catch (error) {
    next(error);
  }
}

const registerEmployeeHourAsync = async (request, response, next) => {
  try {
    let { eventId, employeeId } = request.body;
    let schedule = await SchedulesService.reportHoursAsync({ eventIds: [eventId], employeeId });

    created(response, request.originalUrl, schedule);
  } catch (error) {
    next(error);
  }
}

const fetchRegisteredHoursAsync = async (request, response, next) => {
  try {
    let { page, pageSize } = extractPaginationElements(request, 100);
    let { startDate, endDate } = extractDateRange(request);
    
    const schedules = await SchedulesService.getHoursAsync(startDate, endDate, page, pageSize);

    ok(response, request.originalUrl, schedules);
  } catch (error) {
    next(error);
  } 
}

const fetchEmployeeHoursAsync = async (request, response, next) => {
  try {
    let employeeId = request.params.employeeId;
    if (isNullUndefinedOrEmpty(employeeId)) {
      throw new BadRequestError('Employee id cannot be undefined');
    }

    let { page, pageSize } = extractPaginationElements(request, 100);
    let { startDate, endDate } = extractDateRange(request);

    const schedules = await SchedulesService.getEmployeeHoursAsync(employeeId, startDate, endDate, page, pageSize);

    ok(response, request.originalUrl, schedules);
  } catch (error) {
    next(error);
  } 
}

const fetchRegisteredHoursByEventTypeAsync = async (request, response, next) => {
  try {
    let eventId = request.params.eventId !== '{eventId}' && isNotNullNorUndefined(request.params.eventId) ? +request.params.eventId : undefined;
    if (isNullOrUndefined(eventId)) {
      throw new BadRequestError('Event id cannot be undefined');
    }

    let { page, pageSize } = extractPaginationElements(request, 100);
    let { startDate, endDate } = extractDateRange(request);

    const schedules = await SchedulesService.getHoursByEventAsync(eventId, startDate, endDate, page, pageSize);

    ok(response, request.originalUrl, schedules);
  } catch (error) {
    next(error);
  }   
}

module.exports = {
  registerMyHoursAsync,
  registerEmployeeHourAsync,
  fetchRegisteredHoursAsync,
  fetchEmployeeHoursAsync,
  fetchRegisteredHoursByEventTypeAsync    
};
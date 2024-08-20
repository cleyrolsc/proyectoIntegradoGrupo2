const { formatResponse } = require('../../Core/Utils/response-formatter.util');

const SchedulesService = require('../../Services/Schedules/schedules.service');

const registerEmployeeHourAsync = async (request, response, next) => {
  try {
    let { eventId, employeeId } = request.body;
    let schedule = await SchedulesService.reportEventTimeAsync({ eventId, employeeId });

    response.status(201).json(formatResponse(201, request.originalUrl, schedule));
  } catch (error) {
    next(error);
  }
}

const fetchAllRegisteredHoursAsync = async (request, response, next) => {
  try {
    let page = isNotNullNorUndefined(request.query.page) ? +request.query.page : 1;
    let pageSize = isNotNullNorUndefined(request.query.pageSize) ? +request.query.pageSize : 10;
    const schedules = await SchedulesService.getAllSchedulesAsync(page, pageSize);

    response.status(200).json(formatResponse(200, request.originalUrl, schedules));
  } catch (error) {
    next(error);
  }   
}

const fetchEmployeeHourHistoryAsync = async (request, response, next) => {
  try {
    let page = isNotNullNorUndefined(request.query.page) ? +request.query.page : 1;
    let pageSize = isNotNullNorUndefined(request.query.pageSize) ? +request.query.pageSize : 10;
    const id = request.body.employeeId;
    const schedules = await SchedulesService.getAllEmployeeSchedulesAsync(id, page, pageSize);

    response.status(200).json(formatResponse(200, request.originalUrl, schedules));
  } catch (error) {
    next(error);
  }
};

const fetchRegisteredHoursByEventTypeAsync = async (request, response, next) => {
  try {
    let page = isNotNullNorUndefined(request.query.page) ? +request.query.page : 1;
    let pageSize = isNotNullNorUndefined(request.query.pageSize) ? +request.query.pageSize : 10;
    const id = request.body.eventId;
    const schedules = await SchedulesService.getAllEventSchedulesAsync(id, page, pageSize);

    response.status(200).json(formatResponse(200, request.originalUrl, schedules));
  } catch (error) {
    next(error);
  }
};

const fetchAllRegisteredHoursByDateRangeAsync = async (request, response, next) => {
  try {
    let page = isNotNullNorUndefined(request.query.page) ? +request.query.page : 1;
    let pageSize = isNotNullNorUndefined(request.query.pageSize) ? +request.query.pageSize : 10;
    const {startDate, endDate} = request.body;
    const schedules = await SchedulesService.getAllSchedulesByDateRangeAsync(startDate, endDate, page, pageSize);

    response.status(200).json(formatResponse(200, request.originalUrl, schedules));
  } catch (error) {
    next(error);
  } 
}

const fetchEmployeeHourHistoryByDateRangeAsync = async (request, response, next) => {
  try {
    let page = isNotNullNorUndefined(request.query.page) ? +request.query.page : 1;
    let pageSize = isNotNullNorUndefined(request.query.pageSize) ? +request.query.pageSize : 10;
    const {employeeId, startDate, endDate} = request.body;
    const schedules = await SchedulesService.getAllEmployeeScheduleByDateRangeAsync(employeeId, startDate, endDate, page, pageSize);

    response.status(200).json(formatResponse(200, request.originalUrl, schedules));
  } catch (error) {
    next(error);
  } 
}

const fetchRegisteredHoursByEventTypeByDateRangeAsync = async (request, response, next) => {
  try {
    let page = isNotNullNorUndefined(request.query.page) ? +request.query.page : 1;
    let pageSize = isNotNullNorUndefined(request.query.pageSize) ? +request.query.pageSize : 10;
    const {eventId, startDate, endDate} = request.body;
    const schedules = await SchedulesService.getAllEventSchedulesAsyncByDateRangeAsync(eventId, startDate, endDate, page, pageSize);

    response.status(200).json(formatResponse(200, request.originalUrl, schedules));
  } catch (error) {
    next(error);
  }   
}

module.exports = {
  registerEmployeeHourAsync,
  fetchAllRegisteredHoursAsync,
  fetchEmployeeHourHistoryAsync,
  fetchRegisteredHoursByEventTypeAsync,
  fetchAllRegisteredHoursByDateRangeAsync,
  fetchEmployeeHourHistoryByDateRangeAsync,
  fetchRegisteredHoursByEventTypeByDateRangeAsync    
};




const { BadRequestError, UnauthorizedError } = require('../../Core/Abstractions/Exceptions');
const { isNullOrUndefined, isNotNullUndefinedNorEmpty, isNotNullNorUndefined, isNullUndefinedOrEmpty } = require('../../Core/Utils/null-checker.util');
const { formatResponse } = require('../../Core/Utils/response-formatter.util');

const AuthService = require('../../Services/Auth/auth.service');
const UsersService = require('../../Services/Users/users.service');
const SchedulesService = require('../../Services/Schedules/schedules.service');

const registerMyHourAsync = async (request, response, next) => {
  try {
    let { eventId} = request.body;
    let employeeId = await fetchEmployeeIdWithAuthTokenAsync(request);
    let schedule = await SchedulesService.reportHoursAsync({ eventId, employeeId });

    response.status(201).json(formatResponse(201, request.originalUrl, schedule));
  } catch (error) {
    next(error);
  }
}

async function fetchEmployeeIdWithAuthTokenAsync(request) {
  const bearerHeader = request.header('authorization');
  if (isNullUndefinedOrEmpty(bearerHeader)) {
    throw new UnauthorizedError('No bearer authorization token was found');
  }

  let token = bearerHeader.split(' ')[1];
  if (isNullUndefinedOrEmpty(token)) {
    throw new UnauthorizedError('No token was found');
  }

  let { username } = await AuthService.validateTokenAsync(token);
  let { employeeInfo } = await UsersService.getUserProfileAsync(username);

  return employeeInfo.employeeId;
}

const registerEmployeeHourAsync = async (request, response, next) => {
  try {
    let { eventId, employeeId } = request.body;
    let schedule = await SchedulesService.reportHoursAsync({ eventId, employeeId });

    response.status(201).json(formatResponse(201, request.originalUrl, schedule));
  } catch (error) {
    next(error);
  }
}

const fetchRegisteredHoursAsync = async (request, response, next) => {
  try {
    let { page, pageSize } = extractPaginationElements(request);
    let { startDate, endDate } = extractDateRange(request);
    
    const schedules = await SchedulesService.getHoursAsync(startDate, endDate, page, pageSize);

    response.status(200).json(formatResponse(200, request.originalUrl, schedules));
  } catch (error) {
    next(error);
  } 
}

function extractPaginationElements(request) {
  let page = isNotNullNorUndefined(request.query.page) ? +request.query.page : 1;
  let pageSize = isNotNullNorUndefined(request.query.pageSize) ? +request.query.pageSize : 10;

  return { page, pageSize };
}

function extractDateRange(request) {
  let startDate = isNotNullUndefinedNorEmpty(request.query.startDate) ? new Date(request.query.startDate) : new Date(Date.now() - 86400000);
  let endDate = isNotNullUndefinedNorEmpty(request.query.endDate) ? new Date(request.query.endDate) : new Date();
  
  return { startDate, endDate };
}

const fetchEmployeeHoursAsync = async (request, response, next) => {
  try {
    let employeeId = +request.params.employeeId;
    if (isNullOrUndefined(employeeId)) {
      throw new BadRequestError('Employee id cannot be undefined');
    }

    let { page, pageSize } = extractPaginationElements(request);
    let { startDate, endDate } = extractDateRange(request);

    const schedules = await SchedulesService.getEmployeeHoursAsync(employeeId, startDate, endDate, page, pageSize);

    response.status(200).json(formatResponse(200, request.originalUrl, schedules));
  } catch (error) {
    next(error);
  } 
}

const fetchRegisteredHoursByEventTypeAsync = async (request, response, next) => {
  try {
    let eventId = +request.params.eventId;
    if (isNullOrUndefined(eventId)) {
      throw new BadRequestError('Event id cannot be undefined');
    }

    let { page, pageSize } = extractPaginationElements(request);
    let { startDate, endDate } = extractDateRange(request);

    const schedules = await SchedulesService.getHoursByEventAsync(eventId, startDate, endDate, page, pageSize);

    response.status(200).json(formatResponse(200, request.originalUrl, schedules));
  } catch (error) {
    next(error);
  }   
}

module.exports = {
  registerMyHourAsync,
  registerEmployeeHourAsync,
  fetchRegisteredHoursAsync,
  fetchEmployeeHoursAsync,
  fetchRegisteredHoursByEventTypeAsync    
};
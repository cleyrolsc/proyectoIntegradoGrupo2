const SchedulesService = require('../../Services/Schedules/schedules.service');

const fetchCreateSchedule = async (request, response, next) => {
  try {
    let { eventId, employeeId } = request.body;
    let schedule = await SchedulesService.reportEventTime({ eventId, employeeId });

    response.status(200).json(formatResponse(200, request.originalUrl, schedule));
  } catch (error) {
    next(error);
  }
}

const fetchGetAllSchedules = async (request, response, next) => {
  try {
    let page = isNotNullNorUndefined(request.query.page) ? +request.query.page : 1;
    let pageSize = isNotNullNorUndefined(request.query.pageSize) ? +request.query.pageSize : 10;
    const schedules = await SchedulesService.getAllSchedules(page, pageSize);

    response.status(200).json(formatResponse(200, request.originalUrl, schedules));
  } catch (error) {
    next(error);
  }   
}

const fetchGetAllEmployeeASchedules = async (request, response, next) => {
  try {
    const id = request.body.employeeId;
    const schedules = await SchedulesService.getAllEmployeeSchedules(id);

    response.status(200).json(formatResponse(200, request.originalUrl, schedules));
  } catch (error) {
    next(error);
  }
};

const fetchGetAllEventSchedules = async (request, response, next) => {
  try {
    const id = request.body.eventId;
    const schedules = await SchedulesService.getAllEventSchedules(id);

    response.status(200).json(formatResponse(200, request.originalUrl, schedules));
  } catch (error) {
    next(error);
  }
};

const fetchGetAllSchedulesByDateRange = async (request, response, next) => {
  try {
    let page = isNotNullNorUndefined(request.query.page) ? +request.query.page : 1;
    let pageSize = isNotNullNorUndefined(request.query.pageSize) ? +request.query.pageSize : 10;
    const {startDate, endDate} = request.body;
    const schedules = await SchedulesService.getAllSchedulesByDateRange(startDate, endDate, page, pageSize);

    response.status(200).json(formatResponse(200, request.originalUrl, schedules));
  } catch (error) {
    next(error);
  } 
}

const fetchGetAllEmployeeScheduleByDateRange = async (request, response, next) => {
  try {
    const {employeeId, startDate, endDate} = request.body;
    const schedules = await SchedulesService.getAllEmployeeScheduleByDateRange(employeeId, startDate, endDate);

    response.status(200).json(formatResponse(200, request.originalUrl, schedules));
  } catch (error) {
    next(error);
  } 
}

const fetchGetAllEventSchedulesByDateRange = async (request, response, next) => {
  try {
    const {eventId, startDate, endDate} = request.body;
    const schedules = await SchedulesService.getAllEventSchedulesByDateRange(eventId, startDate, endDate);

    response.status(200).json(formatResponse(200, request.originalUrl, schedules));
  } catch (error) {
    next(error);
  }   
}


module.exports = {
  fetchCreateSchedule,
  fetchGetAllSchedules,
  fetchGetAllEmployeeASchedules,
  fetchGetAllEventSchedules,
  fetchGetAllSchedulesByDateRange,
  fetchGetAllEmployeeScheduleByDateRange,
  fetchGetAllEventSchedulesByDateRange    
};




const { BadRequestError, NotImplementedError } = require("../Core/Abstractions/Exceptions");
const { isNullOrUndefined, isListEmpty } = require("../Core/Utils/null-checker.util");

const DatabaseManager = require("../Database/database");

const tableName = "reportedHours";

const createReportedHour = (employeeId, eventId) => {
    if(isNullOrUndefined(employeeId)){
        throw new BadRequestError('EmployeeId cannot be null')
    }

    if(isNullOrUndefined(eventId)){
        throw new BadRequestError('EventId cannot be null')
    }
    
    return DatabaseManager.run(`INSERT INTO ${tableName} (employeeId, eventId) VALUES (${+employeeId}, ${+eventId})`);
};

const getReportedHours = () => {
    let reportedHours = DatabaseManager.query(`SELECT * FROM ${tableName}`);

    return reportedHours;
};

const getReportedHoursByEmployeeId = (employeeId) => {
    if(isNullOrUndefined(employeeId)){
        throw new BadRequestError('EmployeeId cannot be null')
    }

    let reportedHours = DatabaseManager.query(`SELECT * FROM ${tableName} WHERE employeeId = ${+employeeId}`);

    return reportedHours;
};

const getReportedHoursByEventId = (eventId) => {
    if(isNullOrUndefined(eventId)){
        throw new BadRequestError('EventId cannot be null')
    }

    let reportedHours = DatabaseManager.query(`SELECT * FROM ${tableName} WHERE eventId = ${+eventId}`);

    return reportedHours;
};

const getReportedHoursBetween = (startDate, endDate = new Date()) => {
    if (startDate > endDate){
        throw new BadRequestError('Start date cannot be at a later date than end date');
    }

    let reportedHours = DatabaseManager.query(`SELECT * FROM ${tableName} WHERE eventDate BETWEEN ${startDate} and ${endDate}`);

    return reportedHours;
};

const updateReportedHour = (id) => {
    throw new NotImplementedError();
};

const deleteReportedHour = (id) => {
    throw new NotImplementedError();
};

module.exports = {
    createReportedHour,
    getReportedHours,
    getReportedHoursByEmployeeId,
    getReportedHoursByEventId,
    getReportedHoursBetween,
    updateReportedHour,
    deleteReportedHour
};
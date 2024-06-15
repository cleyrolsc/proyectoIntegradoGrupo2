const { FatalError, BadRequestError, NotImplementedError } = require("../Core/Abstractions/Exceptions");
const { isNullUndefinedOrEmpty, isNullOrUndefined, isListEmpty } = require("../Core/Utils/null-checker.util");

const DatabaseManager = require("../Database/database");

const tableName = "incidents";

const createIncident = (employeeId, comment) => {
    if(isNullUndefinedOrEmpty(comment)){
        throw new BadRequestError('Comment cannot be empty');
    }

    return DatabaseManager.run(`INSERT INTO ${tableName} (employeeId, comment) VALUES (${employeeId}, '${comment}')`);
};

const getIncidentById = (id) => {
    let incidents = DatabaseManager.query(`SELECT * FROM ${tableName} WHERE id = ${+id} LIMIT 1`);
    if (isListEmpty(incidents)) {
        return undefined;
    }

    return incidents[0];
};

const getIncidents = () => {
    let incidents = DatabaseManager.query(`SELECT * FROM ${tableName}`);

    return incidents;
};

const getIncidentsByEmployeeId = (employeeId) => {
    let incidents = DatabaseManager.query(`SELECT * FROM ${tableName} WHERE employeeId = ${+employeeId}`);
    if (isListEmpty(incidents)) {
        return undefined;
    }

    return incidents[0];
};

const getIncidentsBetween = (startDate, endDate = new Date()) => {
    if (startDate > endDate){
        throw new BadRequestError('Start date cannot be at a later date than end date');
    }
    let incidents = DatabaseManager.query(`SELECT * FROM ${tableName} WHERE reportDate BETWEEN ${startDate} and ${endDate}`);

    return incidents;
};

const updateIncident = (id, newComment) => {
    if(isNullUndefinedOrEmpty(newComment)){
        throw new BadRequestError('Comment cannot be empty');
    }

    let incident = getIncidentById(id);
    if (isNullOrUndefined(incident)) {
        return undefined;
    }

    if (incident.comment === newComment) {
        return incident;
    }

    let result = DatabaseManager.run(`UPDATE ${tableName} SET comment = '${newComment}' WHERE id = ${id}`);
    if (result.changes === 0) {
        throw new FatalError(`Unable to update incident with id '${id}'`);
    }

    return getIncidentById(id);

};

const deleteIncident = (id) => {
    throw new NotImplementedError();
};

module.exports = {
    createIncident,
    getIncidentById,
    getIncidents,
    getIncidentsByEmployeeId,
    getIncidentsBetween,
    updateIncident,
    deleteIncident
};
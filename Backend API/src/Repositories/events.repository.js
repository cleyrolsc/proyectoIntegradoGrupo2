const { FatalError, BadRequestError, NotImplementedError } = require("../Core/Abstractions/Exceptions");
const { isNullUndefinedOrEmpty, isNullOrUndefined, isListEmpty } = require("../Core/Utils/null-checker.util");

const DatabaseManager = require("../Database/database");

const tableName = "events";


const createEvent = (description) => {
    if(isNullUndefinedOrEmpty(description)){
        throw new BadRequestError('Description cannot be empty');
    }

    return DatabaseManager.run(`INSERT INTO ${tableName} (description) VALUES (${description})`);
};

const getEvents = () => {
    let departments = DatabaseManager.query(`SELECT * FROM ${tableName}`);

    return departments;
};

const getEventById = (id) => {
    let departments = DatabaseManager.query(`SELECT * FROM ${tableName} WHERE id = ${+id} LIMIT 1`);
    if (isListEmpty(departments)) {
        return undefined;
    }

    return departments[0];
};

const updateEvent = (id, newDescription) => {
    if(isNullUndefinedOrEmpty(newDescription)){
        throw new BadRequestError('Description cannot be empty');
    }

    let event = getEventById(id);
    if (isNullOrUndefined(event)) {
        return undefined;
    }

    if (event.description === newDescription) {
        return event;
    }

    let result = DatabaseManager.run(`UPDATE ${tableName} SET description = ${newDescription} WHERE id = ${id}`);
    if (result.changes === 0) {
        throw new FatalError(`Unable to update event with id '${id}'`);
    }

    return getEventById(id);
};

const deleteEvent = () => {
    throw new NotImplementedError();
}

module.exports = {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent,
}
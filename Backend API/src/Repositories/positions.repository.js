const { FatalError, BadRequestError, NotImplementedError } = require("../Core/Abstractions/Exceptions");
const { isNullUndefinedOrEmpty, isNullOrUndefined, isListEmpty } = require("../Core/Utils/null-checker.util");

const DatabaseManager = require("../Database/database");

const tableName = "positions";

const createPosition = (description) => {
    if(isNullUndefinedOrEmpty(description)){
        throw new BadRequestError('Description cannot be empty');
    }

    return DatabaseManager.run(`INSERT INTO ${tableName} (description) VALUES ('${description}')`);
};

const getPositionById = (id) => {
    let positions = DatabaseManager.query(`SELECT * FROM ${tableName} WHERE id = ${+id} LIMIT 1`);
    if (isListEmpty(positions)) {
        return undefined;
    }

    return positions[0];
};

const getPositions = () => {
    let positions = DatabaseManager.query(`SELECT * FROM ${tableName}`);

    return positions;
};

const updatePosition = (id, newDescription) => {
    if(isNullUndefinedOrEmpty(newDescription)){
        throw new BadRequestError('Description cannot be empty');
    }

    let position = getPositionById(id);
    if (isNullOrUndefined(position)) {
        return undefined;
    }

    if (position.description === newDescription) {
        return position;
    }

    let result = DatabaseManager.run(`UPDATE ${tableName} SET description = '${newDescription}' WHERE id = ${id}`);
    if (result.changes === 0) {
        throw new FatalError(`Unable to update position with id '${id}'`);
    }

    return getPositionById(id);
};

const deletePosition = (id) => {
    throw new NotImplementedError();
}

module.exports = {
    createPosition,
    getPositionById,
    getPositions,
    updatePosition,
    deletePosition
}
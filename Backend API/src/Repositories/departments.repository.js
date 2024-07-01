const { FatalError, BadRequestError, NotImplementedError } = require("../Core/Abstractions/Exceptions");
const { isNullUndefinedOrEmpty, isNullOrUndefined, isListEmpty } = require("../Core/Utils/null-checker.util");

const DatabaseManager = require("../Database/database");

const tableName = "departments";

const createDepartment = (description) => {
    if(isNullUndefinedOrEmpty(description)){
        throw new BadRequestError('Description cannot be empty');
    }

    return DatabaseManager.run(`INSERT INTO ${tableName} (description) VALUES ('${description}')`);
};

const getDepartmentById = (id) => {
    let departments = DatabaseManager.query(`SELECT * FROM ${tableName} WHERE id = ${+id} LIMIT 1`);
    if (isListEmpty(departments)) {
        return undefined;
    }

    return departments[0];
};

const getDepartments = () => {
    let departments = DatabaseManager.query(`SELECT * FROM ${tableName}`);

    return departments;
};

const updateDepartment = (id, newDescription) => {
    if(isNullUndefinedOrEmpty(newDescription)){
        throw new BadRequestError('Description cannot be empty');
    }

    let department = getDepartmentById(id);
    if (isNullOrUndefined(department)) {
        return undefined;
    }

    if (department.description === newDescription) {
        return department;
    }

    let result = DatabaseManager.run(`UPDATE ${tableName} SET description = '${newDescription}' WHERE id = ${id}`);
    if (result.changes === 0) {
        throw new FatalError(`Unable to update department with id '${id}'`);
    }

    return getDepartmentById(id);
};

const deleteDepartment = (id) => {
    throw new NotImplementedError();
}

module.exports = {
    createDepartment,
    getDepartmentById,
    getDepartments,
    updateDepartment,
    deleteDepartment,
}
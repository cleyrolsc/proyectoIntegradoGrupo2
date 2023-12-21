const { isListEmpty, isNotNullNorUndefined } = require("../Core/Utils/null-checker.util");
const { PrivilegeStatus } = require("../Core/Abstractions/Enums");

const DatabaseManager = require("../Database/database");

const tableName = "privileges";

const createPrivilege = (name, level) => {
        // Validate data

        let today = new Date();
        let values = `'${name}', '${+level}', '${+PrivilegeStatus.Active}', '${today.toString()}'`;
    
        return DatabaseManager.run(`INSERT INTO ${tableName} (name, level, status, createdOn) VALUES (${values})`);
};

const getPrivilegeByName = (name) => {
    let privileges = DatabaseManager.query(`SELECT * FROM ${tableName} WHERE name = ${name} LIMIT 1`);
    if (isListEmpty(privileges)) {
        return undefined;
    }

    return privileges[0];
};

const getPrivileges = (filterByName = undefined, skip = 0, limit = 10, orderBy = "DESC") => {
    let whereClause = isNotNullNorUndefined(filterByName) ? `WHERE name LIKE '%${filterByName}%'`: "";

    let privileges = DatabaseManager.query(`SELECT * FROM ${tableName} ${whereClause} ORDER BY name ${orderBy} OFFSET ${+(skip * limit)} LIMIT ${+limit}`);

    return privileges;
};

const updatePrivilege = (name, {level = undefined, status = undefined}) => {
    let privilege = getPrivilegeByName(name);
    if (isNullOrUndefined(privilege)) {
        return undefined;
    }

    let params = generateUpdateParameters();

    if (params === "") {
        return getPrivilegeByName(name);
    }

    let result = DatabaseManager.run(`UPDATE ${tableName} SET ${params} WHERE name = ${name}`);
    if (result.changes === 0) {
        throw new FatalError(`Unable to update privilege '${name}'`);
    }

    return getPrivilegeByName(name);

    function generateUpdateParameters() {
        let params = "";

        if (isNotNullNorUndefined(level)) {
            params += `level = ${+level}`;
        }

        if (isNotNullNorUndefined(status)) {
            params += params !== "" ? ", " : params;

            params += `status = ${+status}`;
        }

        let today = new Date();
        params += params !== "" ? `, modifiedOn = '${today.toString()}'` : `modifiedOn = '${today.toString()}'`;
        
        return params;
    }
};

const deletePrivilege = (name) => {
    throw new Error("Not Implemented");
}

module.exports = {
    createPrivilege,
    getPrivilegeByName,
    getPrivileges,
    updatePrivilege,
    deletePrivilege
};
const sqlite = require("better-sqlite3");

const db = new sqlite("./src/Database/backend-api.sqlite3", { fileMustExist: true });

const query = (sql, params = []) => {
    return db.prepare(sql).all(params);
};

const run = (sql, params = []) => {
    return db.prepare(sql).run(params);
}

module.exports = {
    query,
    run
};
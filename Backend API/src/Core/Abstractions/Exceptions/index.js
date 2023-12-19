const BadRequestError = require("./bad-request.error");
const FatalError = require("./fatal.error");
const NotFoundError = require("./not-found.error");
const UnauthorizedError = require("./unauthorized.error");

module.exports = {
    BadRequestError,
    FatalError,
    NotFoundError,
    UnauthorizedError
};
const BadRequestError = require("./bad-request.error");
const ConflictError = require("./conflict.error");
const FatalError = require("./fatal.error");
const ForbiddenError = require("./forbidden.error");
const NotFoundError = require("./not-found.error");
const NotImplementedError = require("./not-implemented.error");
const UnauthorizedError = require("./unauthorized.error");

module.exports = {
    BadRequestError,
    ConflictError,
    FatalError,
    ForbiddenError,
    NotFoundError,
    NotImplementedError,
    UnauthorizedError
};
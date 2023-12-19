class BadRequestError extends Error {
    constructor(message = "One r more arguments are not valid") {
        super(message);
        this.name = "BadRequestError"
    }
};

module.exports = BadRequestError;
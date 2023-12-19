class BadRequestError extends Error {
    constructor(message = "Fatal error occured!") {
        super(message);
        this.name = "BadRequestError"
    }
};

module.exports = BadRequestError;
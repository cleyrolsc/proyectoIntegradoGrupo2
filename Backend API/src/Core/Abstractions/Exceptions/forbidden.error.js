class ForbiddenError extends Error {
    constructor(message = "This action is not allowed") {
        super(message);
        this.name = "ForbiddenError"
    }
};

module.exports = ForbiddenError;
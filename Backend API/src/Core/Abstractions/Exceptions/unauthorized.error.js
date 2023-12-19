class UnauthorizedError extends Error {
    constructor(message = "User is unauthorized") {
        super(message);
        this.name = "UnauthorizedError"
    }
};

module.exports = UnauthorizedError;
class UnauthorizedError extends Error {
    constructor(message = "Invalid operation") {
        super(message);
        this.name = "UnauthorizedError"
    }
};

module.exports = UnauthorizedError;
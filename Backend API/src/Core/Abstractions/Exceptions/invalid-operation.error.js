class InvalidOperationError extends Error {
    constructor(message = "Invalid operation") {
        super(message);
        this.name = "InvalidOperationError"
    }
};

module.exports = InvalidOperationError;
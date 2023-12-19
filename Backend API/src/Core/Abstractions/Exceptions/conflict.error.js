class ConflictError extends Error {
    constructor(message = "Fatal error occured!") {
        super(message);
        this.name = "ConflictError"
    }
};

module.exports = ConflictError;
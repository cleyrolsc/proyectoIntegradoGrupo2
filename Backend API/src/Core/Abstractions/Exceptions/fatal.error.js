class FatalError extends Error {
    constructor(message = "Fatal error occured!") {
        super(message);
        this.name = "FatalError"
    }
};

module.exports = FatalError;
class FatalError extends Error {
    constructor(message = "Fatal error ocurred!") {
        super(message);
        this.name = "FatalError"
    }
};

module.exports = FatalError;
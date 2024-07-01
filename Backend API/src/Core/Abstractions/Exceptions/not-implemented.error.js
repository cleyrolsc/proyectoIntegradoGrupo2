class NotImplementedError extends Error {
    constructor(message = "Method is not implemented") {
        super(message);
        this.name = "NotImplementedError"
    }
};

module.exports = NotImplementedError;
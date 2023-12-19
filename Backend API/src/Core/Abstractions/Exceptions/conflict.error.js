class ConflictError extends Error {
    constructor(message = "New item has an existing conflict with existing data") {
        super(message);
        this.name = "ConflictError"
    }
};

module.exports = ConflictError;
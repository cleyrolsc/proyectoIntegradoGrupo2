const { OperationFilter } = require('swagger-jsdoc');

class CustomHeaderFilter /*extends OperationFilter*/ {
    constructor(options) {
        //super(options);

        this.headerName = options.headerName || 'X-Custom-Header';
    }

    apply(operation, schema) {
        operation.parameters = operation.parameters || [];
        operation.parameters.push({
            name: this.headerName,
            in: 'header',
            required: false,
            type: 'string',
            description: 'Custom header for user-specific data'
        });
    }
};

module.exports = CustomHeaderFilter;
const errorHandlerFilter = (error, request, response, next) => {
    console.log(`${error.constructor.name} -- ${error.message}`);

    let status = 500;

    switch (error.constructor.name) {
        case "BadRequestError":
            status = 400;
            break;
        case "FatalError":
            status = 503;
            break;
        case "UnauthorizedError":
            status = 401;
            break;
        case "NotFoundError":
            status = 404;
            break;
        default:
            break;
    };

    response.status(status).send(error.message);
};

module.exports = errorHandlerFilter;
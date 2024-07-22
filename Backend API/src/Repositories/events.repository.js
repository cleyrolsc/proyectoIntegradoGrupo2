const { BadRequestError, NotImplementedError } = require("../Core/Abstractions/Exceptions");
const { isNullUndefinedOrEmpty, isNullOrUndefined } = require("../Core/Utils/null-checker.util");

const Event = require('./Entities/event.class');

const createEventAsync = (description) => {
    if(isNullUndefinedOrEmpty(description)){
        throw new BadRequestError('Description cannot be empty');
    }

    return Event.create({
        description
    });
};

const getEventByIdAsync = async (id) => {
    let event = await Event.findByPk(id);
    if (isNullOrUndefined(event)) {
        return undefined;
    }

    return event;
};

const getEventsAsync = (skip = 0, limit = 100, orderBy = 'DESC') => Event.findAll({
    order: [['description', orderBy]],
    offset: skip,
    limit
});

const updateEventAsync = async (id, newDescription) => {
    if(isNullUndefinedOrEmpty(newDescription)){
        throw new BadRequestError('Description cannot be empty');
    }

    let event = await getEventByIdAsync(id);
    if (isNullOrUndefined(event)) {
        return undefined;
    }

    if (event.description === newDescription) {
        return event;
    }

    await event.update({
        description: newDescription
    });

    return event;
};

const deleteEventAsync = (id) => {
    throw new NotImplementedError();
}

module.exports = {
    createEventAsync,
    getEventByIdAsync,
    getEventsAsync,
    updateEventAsync,
    deleteEventAsync,
}
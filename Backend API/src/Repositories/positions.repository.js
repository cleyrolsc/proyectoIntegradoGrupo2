const { BadRequestError, NotImplementedError } = require("../Core/Abstractions/Exceptions");
const { isNullUndefinedOrEmpty, isNullOrUndefined } = require("../Core/Utils/null-checker.util");

const Position = require('./Entities/position.class');

const createPositionAsync = async (description) => {
    if(isNullUndefinedOrEmpty(description)){
        throw new BadRequestError('Description cannot be empty');
    }

    return Position.create({
        description
    });
}

const getPositionByIdAsync = async (id) => {
    let position = await Position.findByPk(id);
    if(isNullOrUndefined(position)) {
        return undefined;
    }
    
    return position;
};

const countPositionsAsync = () => Position.count();

const getPositionsAsync = (skip = 0, limit = 10, orderBy = 'ASC') => Position.findAndCountAll({
    order: [['description', orderBy]],
    offset: skip,
    limit
});

const updatePositionAsync = async (id, newDescription) => {
    if(isNullUndefinedOrEmpty(newDescription)){
        throw new BadRequestError('Description cannot be empty');
    }

    let position = await getPositionByIdAsync(id);
    if (isNullOrUndefined(position)) {
        return undefined;
    }

    if (position.description === newDescription) {
        return position;
    }

    await position.update({
        description: newDescription
    });

    return position;
}

const deletePositionAsync = (id) => {
    throw new NotImplementedError();
}

module.exports = {
    createPositionAsync,
    getPositionByIdAsync,
    countPositionsAsync,
    getPositionsAsync,
    updatePositionAsync,
    deletePositionAsync
}
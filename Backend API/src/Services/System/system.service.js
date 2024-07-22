const { BadRequestError } = require("../../Core/Abstractions/Exceptions");
const { isNullUndefinedOrEmpty } = require("../../Core/Utils/null-checker.util");

const { EventsRepository, PositionsRepository, DepartmentRepository } = require("../../Repositories");

const registerDepartmentAsync = (description) => {
    if (isNullUndefinedOrEmpty(description)) {
        throw new BadRequestError(' Description cannot be empty');
    }

    return DepartmentRepository.createDepartmentAsync(description);
};

const getDepartmentsAsync = async (skip = 0, limit = 10, orderBy = 'DESC') => {
    let departments =  await DepartmentRepository.getDepartmentsAsync(skip, limit, orderBy);

    let departmentModels = [];
    departments.forEach(department => {
        let { id, description } = department;
        departmentModels.push({
            id,
            description
        });
    });

    return departmentModels;
};

const registerEventAsync = (description) => {
    if (isNullUndefinedOrEmpty(description)) {
        throw new BadRequestError(' Description cannot be empty');
    }

    return EventsRepository.createEventAsync(description);
};

const getEventsAsync = async (skip = 0, limit = 100, orderBy = 'DESC') => {
    let events =  await EventsRepository.getEventsAsync(skip, limit, orderBy);

    let eventModels = [];
    events.forEach(event => {
        let { id, description } = event;
        eventModels.push({
            id,
            description
        });
    });

    return eventModels;
};

const registerPositionAsync = (description) => {
    if (isNullUndefinedOrEmpty(description)) {
        throw new BadRequestError(' Description cannot be empty');
    }

    return PositionsRepository.createPositionAsync(description);
}

const getPositionsAsync = async (skip = 0, limit = 100, orderBy = 'DESC') => {
    let positions =  await PositionsRepository.getPositionsAsync(skip, limit, orderBy);

    let positionModels = [];
    positions.forEach(position => {
        let { id, description } = position;
        positionModels.push({
            id,
            description
        });
    });

    return positionModels;
};

module.exports = {
    registerDepartmentAsync,
    getDepartmentsAsync,
    registerEventAsync,
    getEventsAsync,
    registerPositionAsync,
    getPositionsAsync
};
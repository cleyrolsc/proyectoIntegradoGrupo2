const { BadRequestError, NotImplementedError } = require("../Core/Abstractions/Exceptions");
const { isNullUndefinedOrEmpty, isNullOrUndefined } = require("../Core/Utils/null-checker.util");

const Incident = require('./Entities/incident.class');
const createIncidentAsync = (employeeId, comment) => {
    if(isNullUndefinedOrEmpty(comment)){
        throw new BadRequestError('Comment cannot be empty');
    }

    return Incident.create({
        employeeId,
        comment
    });
};

const getIncidentByIdAsync = async (id) => {
    let incident = await Incident.findByPk(id);
    if (isNullOrUndefined(incident)) {
        return undefined;
    }

    return incident;
};

const getIncidentsAsync = (skip = 0, limit = 10, orderBy = 'ASC') => Incident.findAll({
    order: [['createdAt', orderBy]],
    offset: skip,
    limit
});

const getIncidentsByEmployeeIdAsync = (employeeId, skip = 0, limit = 10, orderBy = 'ASC') => {
    if(isNullOrUndefined(employeeId)){
        throw new BadRequestError('Employee id cannot be undefined');
    }

    return Incident.findAll({
        where: {
            employeeId
        },
        order: [['createdAt', orderBy]],
        offset: skip,
        limit
    });
};

const getIncidentsBetweenAsync = (startDate, endDate = new Date(), skip = 0, limit = 10, orderBy = 'ASC') => {
    if (startDate > endDate){
        throw new BadRequestError('Start date cannot be at a later date than end date');
    }

    return Incident.findAll({
        where: {
            createdAt: {
                [Op.between]: [startDate, endDate]
            }
        },
        order: [['createdAt', orderBy]],
        offset: skip,
        limit
    });
};

const updateIncidentAsync = async (id, newComment) => {
    if(isNullUndefinedOrEmpty(newComment)){
        throw new BadRequestError('Comment cannot be empty');
    }

    let incident = await getIncidentByIdAsync(id);
    if (isNullOrUndefined(incident)) {
        return undefined;
    }

    if (incident.comment === newComment) {
        return incident;
    }

    await incident.update({
        comment: newComment
    });

    return incident;
};

const deleteIncidentAsync = (id) => {
    throw new NotImplementedError();
};

module.exports = {
    createIncidentAsync,
    getIncidentByIdAsync,
    getIncidentsAsync,
    getIncidentsByEmployeeIdAsync,
    getIncidentsBetweenAsync,
    updateIncidentAsync,
    deleteIncidentAsync
};
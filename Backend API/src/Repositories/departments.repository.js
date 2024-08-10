const { BadRequestError, NotImplementedError } = require("../Core/Abstractions/Exceptions");
const { isNullUndefinedOrEmpty, isNullOrUndefined } = require("../Core/Utils/null-checker.util");

const Department = require('./Entities/department.class');

const createDepartmentAsync = (description) => {
    if(isNullUndefinedOrEmpty(description)){
        throw new BadRequestError('Description cannot be empty');
    }

    return Department.create({
        description
    });
};

const getDepartmentByIdAsync = async (id) => {
    let department = await Department.findByPk(id);
    if(isNullOrUndefined(department)) {
        return undefined;
    }

    return department;
};

const countDepartmentsAsync = () => Department.count();

const getDepartmentsAsync = (skip = 0, limit = 10, orderBy = 'ASC') => Department.findAndCountAll({
    order: [['description', orderBy]],
    offset: skip,
    limit
});

const updateDepartmentAsync = async (id, newDescription) => {
    if(isNullUndefinedOrEmpty(newDescription)){
        throw new BadRequestError('Description cannot be empty');
    }

    let department = await getDepartmentByIdAsync(id);
    if (isNullOrUndefined(department)) {
        return undefined;
    }

    if (department.description === newDescription) {
        return department;
    }

    await department.update({
        description: newDescription
    });

    return department;
}

const deleteDepartmentAsync = (id) => {
    throw new NotImplementedError();
}

module.exports = {
    createDepartmentAsync,
    getDepartmentByIdAsync,
    countDepartmentsAsync,
    getDepartmentsAsync,
    updateDepartmentAsync,
    deleteDepartmentAsync,
}
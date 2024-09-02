const {
    BadRequestError,
    NotImplementedError,
} = require("../Core/Abstractions/Exceptions");
const {
    isNullUndefinedOrEmpty,
    isNullOrUndefined,
} = require("../Core/Utils/null-checker.util");
const { Op } = require("sequelize");

const PayrollDispute = require("./Entities/payroll-dispute.class");

const createPayrollDisputeAsync = (
    employeeId,
    payrollId,
    comment,
    employeeApproval,
    supervisorId,
    managerId
) => {
    if (isNullUndefinedOrEmpty(comment)) {
        throw new BadRequestError("Comment cannot be empty");
    }

    return PayrollDispute.create({
        employeeId,
        payrollId,
        comment,
        employeeApproval,
        supervisorId,
        managerId,
    });
};

const getPayrollDisputeByIdAsync = async (id) => {
    let payrollDispute = await PayrollDispute.findByPk(id);
    if (isNullOrUndefined(payrollDispute)) {
        return undefined;
    }

    return payrollDispute;
};

const getPayrollDisputesAsync = (skip = 0, limit = 10, orderBy = "DESC") =>
    PayrollDispute.findAndCountAll({
        order: [["createdAt", orderBy]],
        offset: skip,
        limit,
    });

const getPayrollDisputeByPayrollIdAsync = (
    payrollId,
    skip = 0,
    limit = 10,
    orderBy = "DESC"
) => {
    if (isNullOrUndefined(payrollId)) {
        throw new BadRequestError("Payroll id cannot be undefined");
    }

    return PayrollDispute.findAndCountAll({
        where: {
            payrollId,
        },
        order: [["createdAt", orderBy]],
        offset: skip,
        limit,
    });
};

const getPayrollDisputesByEmployeeIdAsync = (
    employeeId,
    skip = 0,
    limit = 10,
    orderBy = "DESC"
) => {
    if (isNullUndefinedOrEmpty(employeeId)) {
        throw new BadRequestError("Employee id cannot be undefined");
    }

    return PayrollDispute.findAndCountAll({
        where: {
            employeeId,
        },
        order: [["createdAt", orderBy]],
        offset: skip,
        limit,
    });
};

const getPayrollDisputesBySupervisorIdOrManagerIdAsync = (
    employeeId,
    skip = 0,
    limit = 10,
    orderBy = "DESC"
) => {
    if (isNullOrUndefined(employeeId)) {
        throw new BadRequestError("Supervisor or manager id cannot be undefined");
    }

    return PayrollDispute.findAndCountAll({
        where: {
            [Op.or]: [{ supervisorId: employeeId }, { managerId: employeeId }],
        },
        order: [["createdAt", orderBy]],
        offset: skip,
        limit,
    });
};

const getPayrollDisputesByStatusAsync = (
    status,
    skip = 0,
    limit = 10,
    orderBy = "DESC"
) =>
    PayrollDispute.findAll({
        where: {
            status,
        },
        order: [["createdAt", orderBy]],
        offset: skip,
        limit,
    });

const getPayrollDisputesByDateRangeAsync = (
    startDate,
    endDate = new Date(),
    skip = 0,
    limit = 10,
    orderBy = "DESC"
) => {
    if (startDate > endDate) {
        throw new BadRequestError(
            "Start date cannot be at a later date than end date"
        );
    }

    return PayrollDispute.findAll({
        where: {
            createdAt: {
                [Op.between]: [startDate, endDate],
            },
        },
        order: [["createdAt", orderBy]],
        offset: skip,
        limit,
    });
};

const updatePayrollDisputeCommentAsync = async (id, newComment) => {
    if (isNullUndefinedOrEmpty(newComment)) {
        throw new BadRequestError("Comment cannot be empty");
    }

    let payrollDispute = await getPayrollDisputeByIdAsync(id);
    if (isNullOrUndefined(payrollDispute)) {
        return undefined;
    }

    if (payrollDispute.comment === newComment) {
        return payrollDispute;
    }

    await payrollDispute.update({
        comment: newComment,
    });

    return payrollDispute;
};

const updatePayrollDisputeStatusAsync = async (id, newStatus) => {
    if (isNullOrUndefined(newStatus)) {
        throw new BadRequestError("Status cannot be undefined");
    }

    let payrollDispute = await getPayrollDisputeByIdAsync(id);
    if (isNullOrUndefined(payrollDispute)) {
        return undefined;
    }

    if (payrollDispute.status === newStatus) {
        return payrollDispute;
    }

    await payrollDispute.update({
        status: newStatus,
    });

    return payrollDispute;
};

const updatePayrollDisputeApprovalAsync = async (id, employeeId, approval) => {
    if (isNullOrUndefined(employeeId)) {
        throw new BadRequestError("Employee id cannot be undefined");
    }

    if (isNullOrUndefined(approval)) {
        throw new BadRequestError("Approval cannot be undefined");
    }

    let payrollDispute = await getPayrollDisputeByIdAsync(id);
    if (isNullOrUndefined(payrollDispute)) {
        return undefined;
    }

    if (payrollDispute.employeeId === employeeId) {
        await payrollDispute.update({
            employeeApproval: approval,
        });

        return payrollDispute;
    }

    if (payrollDispute.supervisorId === employeeId) {
        payrollDispute.supervisorApproval = approval;
    }

    if (payrollDispute.managerId === employeeId) {
        payrollDispute.managerApproval = approval;
    }

    await payrollDispute.save();

    return payrollDispute;
};

module.exports = {
    createPayrollDisputeAsync,
    getPayrollDisputeByIdAsync,
    getPayrollDisputesAsync,
    getPayrollDisputeByPayrollIdAsync,
    getPayrollDisputesByEmployeeIdAsync,
    getPayrollDisputesBySupervisorIdOrManagerIdAsync,
    getPayrollDisputesByStatusAsync,
    getPayrollDisputesByDateRangeAsync,
    updatePayrollDisputeCommentAsync,
    updatePayrollDisputeStatusAsync,
    updatePayrollDisputeApprovalAsync,
};

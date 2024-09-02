const { PaginatedResponse } = require("../../Core/Abstractions/Contracts/Responses");
const { PaymentStatus, EventType, PayrollDisputeStatus } = require("../../Core/Abstractions/Enums");
const { NotFoundError, BadRequestError, UnauthorizedError } = require("../../Core/Abstractions/Exceptions");
const { isNullOrUndefined, isArrayNullUndefinedOrEmpty, isNullUndefinedOrEmpty } = require("../../Core/Utils/null-checker.util");
const { formatPaginatedResponse } = require("../../Core/Utils/response-formatter.util");

const { EmployeesRepository, SchedulesRepository, PayrollsRepository, PayrollDisputesRepository } = require("../../Repositories");

//#region Payrolls
const registerPayrollAsync = async (employeeId) => {
    let employee = await checkIfEmployeeExistAsync(employeeId);

    const todayStart = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
    const todayEnd = new Date(new Date().setHours(23, 59, 59, 999)).getTime();
    let { count: schedulesCount, rows: schedules } = await SchedulesRepository.getSchedulesByEmployeeIdAsync(employeeId, todayStart, todayEnd, 0, 1000, 'ASC');
    if (schedulesCount === 0) {
        throw new NotFoundError(`No hours have been recorded today for employee with id '${employeeId}'`);
    }

    let { count: payrollsCount, rows: todaysPayrolls } = await PayrollsRepository.getPayrollsByEmployeeIdAsync(employeeId, todayStart, todayEnd, PaymentStatus.Pending, 0, 1);
    if (payrollsCount === 0) {
        return await createNewPayrollAsync();
    } else {
        return await updateExistingPayrollAsync();
    }

    //#region Aux methods
    async function createNewPayrollAsync() {
        let { totalWorkHours, totalWorkPay } = calculateTotalWorkHoursAndPay(employee.payPerHour);
        let totalBreakHours = calculateTotalBreakHours();
        let { totalTrainingHours, totalTrainingPay } = calculateTotalTrainingHoursAndPay(employee.payPerHour);
        let grossPay = totalWorkPay + totalTrainingPay;

        todaysPayrolls = await PayrollsRepository.createPayrollAsync(employeeId, employee.payPerHour, todayStart, todayEnd, totalWorkHours, totalTrainingHours, totalBreakHours);

        return formatResponse(todaysPayrolls.id, +employee.payPerHour, +totalWorkHours.toFixed(7),
            totalWorkPay, +totalBreakHours.toFixed(7), +totalTrainingHours.toFixed(7),
            totalTrainingPay, grossPay, PaymentStatus.Pending);
    };

    function calculateTotalWorkHoursAndPay(payPerHour) {
        let workStartingList = schedules.filter(schedule => schedule.eventId === EventType.WorkingStart);
        let workEndList = schedules.filter(schedule => schedule.eventId === EventType.WorkingEnd);
        let { totalHours: totalWorkHours, totalPay: totalWorkPay } = calculateTotalHoursAndPay(workStartingList, workEndList, payPerHour);

        return { totalWorkHours, totalWorkPay };
    };

    function calculateTotalHoursAndPay(startingHours, endingHours, payPerHour = 0.0) {
        let totalHours = 0;
        for (let i = 0; i < Math.min(startingHours.length, endingHours.length); i++) {
            var diff = (endingHours[i].eventDate - startingHours[i].eventDate) / 1000;
            diff /= (60 * 60);
            totalHours += diff;
        }

        let totalPay = +(Math.round((totalHours * payPerHour) * 100) / 100).toFixed(2);

        return { totalHours, totalPay };
    };

    function calculateTotalBreakHours() {
        let breakStartingList = schedules.filter(schedule => schedule.eventId === EventType.BreakStart);
        let breakEndList = schedules.filter(schedule => schedule.eventId === EventType.BreakEnd);
        let { totalHours: totalBreakHours } = calculateTotalHoursAndPay(breakStartingList, breakEndList);

        return totalBreakHours;
    };

    function calculateTotalTrainingHoursAndPay(payPerHour) {
        let trainingStartingList = schedules.filter(schedule => schedule.eventId === EventType.TrainingStart);
        let trainingEndList = schedules.filter(schedule => schedule.eventId === EventType.TrainingEnd);
        let { totalHours: totalTrainingHours, totalPay: totalTrainingPay } = calculateTotalHoursAndPay(trainingStartingList, trainingEndList, payPerHour);

        return { totalTrainingHours, totalTrainingPay };
    };

    function formatResponse(id, payPerHour, totalWorkHours, totalWorkPay, totalBreakHours, totalTrainingHours, totalTrainingPay, grossPay, paymentStatus) {
        return {
            id,
            startDate: new Date(todayStart),
            endDate: new Date(todayEnd),
            employeeId,
            fullName: `${employee.firstName} ${employee.lastName}`,
            payPerHour,
            totalWorkHours,
            totalWorkPay,
            totalBreakHours,
            totalTrainingHours,
            totalTrainingPay,
            grossPay,
            paymentStatus
        };
    };

    async function updateExistingPayrollAsync() {
        let { totalWorkHours, totalWorkPay } = calculateTotalWorkHoursAndPay(todaysPayrolls[0].payPerHour);
        let totalBreakHours = calculateTotalBreakHours();
        let { totalTrainingHours, totalTrainingPay } = calculateTotalTrainingHoursAndPay(todaysPayrolls[0].payPerHour);
        let grossPay = totalWorkPay + totalTrainingPay;

        await PayrollsRepository.updatePayrollAsync(todaysPayrolls[0].id, totalWorkHours, totalTrainingHours, totalBreakHours);

        return formatResponse(+todaysPayrolls[0].id, +todaysPayrolls[0].payPerHour, +totalWorkHours.toFixed(7),
            totalWorkPay, +totalBreakHours.toFixed(7), +totalTrainingHours.toFixed(7),
            totalTrainingPay, grossPay, +todaysPayrolls[0].paymentStatus);
    };
    //#endregion
};

async function checkIfEmployeeExistAsync(id) {
    if (isNullOrUndefined(id)) {
        throw new BadRequestError('Employee id cannot be undefined');
    }

    let employee = await EmployeesRepository.getEmployeeByIdAsync(id);
    if (isNullOrUndefined(employee)) {
        throw new NotFoundError(`Employee with id, ${id}, cannot be found`);
    }

    return employee;
};

const getPayrollsAsync = async (paymentStatus = undefined, startDate = new Date(Date.now() - 86400000).getTime(), endDate = new Date().getTime(), currentPage = 1, itemsPerPage = 10, order = 'DESC') => {
    let skip = (currentPage - 1) * itemsPerPage;
    let { count, rows: payrolls } = await PayrollsRepository.getPayrollsAsync(paymentStatus, startDate, endDate, skip, itemsPerPage, order);
    if (isArrayNullUndefinedOrEmpty(payrolls)) {
        return new PaginatedResponse();
    }

    let payrollModels = [];
    payrolls.forEach(payroll => {
        let { id, startDate, endDate, employeeId, payPerHour,
            totalWorkingHours: totalWorkHours, payForWorkingHours: totalWorkPay,
            totalBreakHours: totalBreakHours, totalTrainingHours,
            payForTrainingHours: totalTrainingPay, paymentStatus } = payroll;

        payrollModels.push({
            id,
            startDate,
            endDate,
            employeeId,
            payPerHour,
            totalWorkHours,
            totalWorkPay,
            totalBreakHours,
            totalTrainingHours,
            totalTrainingPay,
            grossPay: totalWorkPay + totalTrainingPay,
            paymentStatus
        });
    });

    return formatPaginatedResponse(currentPage, itemsPerPage, payrollModels, count);
};

const getTodaysPayrollByEmployeeIdAsync = async (employeeId) => {
    let employee = await checkIfEmployeeExistAsync(employeeId);

    const todayStart = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
    const todayEnd = new Date(new Date().setHours(23, 59, 59, 999)).getTime();
    let { rows: todaysPayrolls } = await PayrollsRepository.getPayrollsByEmployeeIdAsync(employeeId, todayStart, todayEnd, undefined, 0, 1);
    if (isArrayNullUndefinedOrEmpty(todaysPayrolls)) {
        throw new NotFoundError(`No hours have been computed today for employee with id '${employeeId}'`);
    }

    let { id, startDate, endDate, payPerHour, totalWorkingHours: totalWorkHours, payForWorkingHours: totalWorkPay, totalBreakHours: totalBreakHours, totalTrainingHours, payForTrainingHours: totalTrainingPay, paymentStatus } = todaysPayrolls[0];

    return {
        id,
        startDate,
        endDate,
        employeeId,
        fullName: `${employee.firstName} ${employee.lastName}`,
        payPerHour,
        totalWorkHours,
        totalWorkPay,
        totalBreakHours,
        totalTrainingHours,
        totalTrainingPay,
        grossPay: totalWorkPay + totalTrainingPay,
        paymentStatus
    };
};

const getPayrollsByEmployeeIdAsync = async (employeeId, paymentStatus = undefined, currentPage = 1, itemsPerPage = 10, order = 'DESC') => {
    let employee = await checkIfEmployeeExistAsync(employeeId);

    let skip = (currentPage - 1) * itemsPerPage;
    let { count, rows: payrolls } = await PayrollsRepository.getPayrollsByEmployeeIdAsync(employeeId, undefined, undefined, paymentStatus, skip, itemsPerPage, order);
    if (isArrayNullUndefinedOrEmpty(payrolls)) {
        return new PaginatedResponse();
    }

    let payrollModels = [];
    payrolls.forEach(payroll => {
        let { id, startDate, endDate, payPerHour, totalWorkingHours: totalWorkHours,
            payForWorkingHours: totalWorkPay, totalBreakHours: totalBreakHours, totalTrainingHours,
            payForTrainingHours: totalTrainingPay, paymentStatus } = payroll;

        payrollModels.push({
            id,
            startDate,
            endDate,
            employeeId,
            fullName: `${employee.firstName} ${employee.lastName}`,
            payPerHour,
            totalWorkHours,
            totalWorkPay,
            totalBreakHours,
            totalTrainingHours,
            totalTrainingPay,
            grossPay: totalWorkPay + totalTrainingPay,
            paymentStatus
        });
    });

    return formatPaginatedResponse(currentPage, itemsPerPage, payrollModels, count);
};

const updatePayrollPaymentStatusAsync = async (id, paymentStatus) => {
    isPaymentStatusValid();
    let payroll = await checkIfPayrollHasBeenGeneratedAsync(id);
    if (paymentStatus === payroll.paymentStatus) {
        return payroll;
    }

    if (payroll.paymentStatus !== PayrollDisputeStatus.Pending) {
        return payroll;
    }

    await hasPayrollDisputeBeenUpdatedAsync();

    let { employeeId, startDate, endDate, payPerHour, totalWorkingHours: totalWorkHours,
        payForWorkingHours: totalWorkPay, totalBreakHours: totalBreakHours, totalTrainingHours,
        payForTrainingHours: totalTrainingPay } = await PayrollsRepository.updatePayrollAsync(id, undefined, undefined, undefined, paymentStatus);

    let employee = await checkIfEmployeeExistAsync(employeeId);

    return {
        id,
        startDate,
        endDate,
        employeeId,
        fullName: `${employee.firstName} ${employee.lastName}`,
        payPerHour,
        totalWorkHours,
        totalWorkPay,
        totalBreakHours,
        totalTrainingHours,
        totalTrainingPay,
        grossPay: totalWorkPay + totalTrainingPay,
        paymentStatus
    };

    function isPaymentStatusValid() {
        if (isNullOrUndefined(paymentStatus)) {
            throw new BadRequestError('Payroll payment status cannot be undefined');
        }

        let values = Object.values(PaymentStatus);
        if (!values.includes(paymentStatus)) {
            throw new BadRequestError(`Invalid payroll dispute status: ${paymentStatus}`);
        }

        if (paymentStatus === PaymentStatus.Pending) {
            throw new BadRequestError(`Payroll payment status cannot be changed to pending '${PaymentStatus.Pending}'`);
        }
    };

    async function hasPayrollDisputeBeenUpdatedAsync() {
        let { count, rows: payrollDisputes } = await PayrollDisputesRepository.getPayrollDisputeByPayrollIdAsync(id);
        if (count === 0) {
            throw new NotFoundError(`No disputes have been created for payroll with id '${id}'`);
        }

        let { status } = payrollDisputes[0];
        if (paymentStatus === PaymentStatus.Paid && status === PayrollDisputeStatus.Rejected) {
            throw new UnauthorizedError(`You cannot pay a payroll that has been rejected for payment`);
        }

        if (paymentStatus === PaymentStatus.Rejected && status === PayrollDisputeStatus.Resolved) {
            throw new UnauthorizedError(`You cannot reject a payroll that has been approved for payment`);
        }
    };
};

async function checkIfPayrollHasBeenGeneratedAsync(id) {
    let payroll = await PayrollsRepository.getPayrollByIdAsync(id);
    if (isNullOrUndefined(payroll)) {
        throw new NotFoundError(`Payroll with id '${id}' does not exist`);
    }

    return payroll;
};

//#endregion

//#region Payroll Disputes
const registerPayrollDisputeAsync = async (employeeId, payrollId, comment, employeeApproval) => {
    let employee = await checkIfEmployeeExistAsync(employeeId);
    let payroll = await checkIfPayrollHasBeenGeneratedAsync(payrollId);

    if (isNullUndefinedOrEmpty(comment)) {
        throw new BadRequestError('Comment cannot be empty');
    }

    let { id: supervisorId, supervisorId: managerId } = await EmployeesRepository.getEmployeeByIdAsync(employee.supervisorId);

    let payrollDispute = await PayrollDisputesRepository.createPayrollDisputeAsync(employee.id, payroll.id, comment, employeeApproval, supervisorId, managerId);

    return formatPayrollDisputeResponseAsync(payrollDispute);
};

async function formatPayrollDisputeResponseAsync(payrollDispute) {
    let { id, employeeId, payrollId, comment, employeeApproval, supervisorId,
        supervisorApproval, managerId, managerApproval, status, createdAt: submittedOn,
        updatedAt: lastModified } = payrollDispute;

    let submittedBy = await getEmployeeInfoAsync(employeeId);
    let payrollInfo = await getPayrollInfoAsync(payrollId);
    let supervisor = await getEmployeeInfoAsync(supervisorId);
    let manager = await getEmployeeInfoAsync(managerId);

    return {
        id,
        submittedBy,
        payrollInfo,
        comment,
        employeeApproval,
        supervisor,
        supervisorApproval,
        manager,
        managerApproval,
        status,
        submittedOn,
        lastModified,
    };
}

async function getEmployeeInfoAsync(employeeId) {
    let employee = await EmployeesRepository.getEmployeeByIdAsync(employeeId);
    let submittedBy = {
        id: employeeId,
        firstName: employee.firstName,
        lastName: employee.lastName
    };

    return submittedBy;
};

async function getPayrollInfoAsync(payrollId) {
    let { id, startDate, endDate, payPerHour, totalWorkingHours, payForWorkingHours, totalTrainingHours, payForTrainingHours, totalBreakHours, paymentStatus } = await PayrollsRepository.getPayrollByIdAsync(payrollId);

    let payrollInfo = {
        id,
        startDate,
        endDate,
        payPerHour: +payPerHour,
        totalWorkingHours: +totalWorkingHours,
        payForWorkingHours: +payForWorkingHours,
        totalTrainingHours: +totalTrainingHours,
        payForTrainingHours: +payForTrainingHours,
        totalBreakHours: +totalBreakHours,
    };

    payrollInfo.totalPayableHours = payrollInfo.totalWorkingHours + payrollInfo.totalTrainingHours;
    payrollInfo.totalPay = payrollInfo.payForWorkingHours + payrollInfo.payForTrainingHours;
    payrollInfo.totalPay = +payrollInfo.totalPay.toFixed(2);
    payrollInfo.paymentStatus = paymentStatus;

    return payrollInfo;
};

const getPayrollDisputesAsync = async (currentPage = 1, itemsPerPage = 10, order = 'DESC') => {
    let skip = (currentPage - 1) * itemsPerPage;
    let { count, rows: payrollDisputes } = await PayrollDisputesRepository.getPayrollDisputesAsync(skip, itemsPerPage, order);
    if (count === 0) {
        return new PaginatedResponse();
    }

    let payrollDisputeModels = [];
    payrollDisputes.forEach(entity => {
        let { id, employeeId, comment, employeeApproval, supervisorId, supervisorApproval, managerId, managerApproval, status, createdAt: submittedOn, updatedAt: lastModified } = entity;
        payrollDisputeModels.push({
            id,
            employeeId,
            comment,
            employeeApproval,
            supervisorId,
            supervisorApproval,
            managerId,
            managerApproval,
            status,
            submittedOn,
            lastModified,
        });
    });

    return formatPaginatedResponse(currentPage, itemsPerPage, payrollDisputeModels, count);
};

const getPayrollDisputeByIdAsync = async (id) => {
    if (isNullOrUndefined(id)) {
        throw new BadRequestError('Payroll dispute id cannot be undefined');
    }

    let payrollDispute = await PayrollDisputesRepository.getPayrollDisputeByIdAsync(id);

    return formatPayrollDisputeResponseAsync(payrollDispute);
};

const getPayrollDisputesByEmployeeIdAsync = async (employeeId, currentPage = 1, itemsPerPage = 10, order = 'DESC') => {
    await checkIfEmployeeExistAsync(employeeId);

    let skip = (currentPage - 1) * itemsPerPage;
    let { count, rows: payrollDisputes } = await PayrollDisputesRepository.getPayrollDisputesByEmployeeIdAsync(employeeId, skip, itemsPerPage, order);
    if (count === 0) {
        return new PaginatedResponse();
    }

    let payrollDisputeModels = [];
    for (let i = 0; i < payrollDisputes.length; i++) {
        let dispute = await formatPayrollDisputeResponseAsync(payrollDisputes[i]);
        payrollDisputeModels.push(dispute);
    }

    return formatPaginatedResponse(currentPage, itemsPerPage, payrollDisputeModels, count);
};

const getPayrollDisputesBySupervisorIdOrManagerIdAsync = async (employeeId, currentPage = 1, itemsPerPage = 10, order = 'DESC') => {
    await checkIfEmployeeExistAsync(employeeId);

    let skip = (currentPage - 1) * itemsPerPage;
    let { count, rows: payrollDisputes } = await PayrollDisputesRepository.getPayrollDisputesBySupervisorIdOrManagerIdAsync(employeeId, skip, itemsPerPage, order);
    if (count === 0) {
        return new PaginatedResponse();
    }

    let payrollDisputeModels = [];
    payrollDisputes.forEach(entity => {
        let { id, employeeId, comment, employeeApproval, supervisorId, supervisorApproval, managerId, managerApproval, status, createdAt: submittedOn, updatedAt: lastModified } = entity;
        payrollDisputeModels.push({
            id,
            employeeId,
            comment,
            employeeApproval,
            supervisorId,
            supervisorApproval,
            managerId,
            managerApproval,
            status,
            submittedOn,
            lastModified,
        });
    });

    return formatPaginatedResponse(currentPage, itemsPerPage, PayrollDisputeModels, count);
};

const updatePayrollDisputeApprovalAsync = async (id, employeeId, approval) => {
    await checkIfEmployeeExistAsync(employeeId);
    let payrollDispute = await checkIfPayrollDisputeExistsAsync(id);

    payrollDispute = await PayrollDisputesRepository.updatePayrollDisputeApprovalAsync(id, employeeId, approval);

    return formatPayrollDisputeResponseAsync(payrollDispute);
};

async function checkIfPayrollDisputeExistsAsync(id) {
    if (isNullOrUndefined(id)) {
        throw new BadRequestError('Payroll dispute id cannot be undefined');
    }

    let payrollDispute = await PayrollDisputesRepository.getPayrollDisputeByIdAsync(id);
    if (isNullOrUndefined(payrollDispute)) {
        throw new NotFoundError(`Payroll dispute with id (${id}) does not exist`);
    }

    return payrollDispute;
};

const updatePayrollDisputeStatusAsync = async (id, status) => {
    isPayrollDisputeStatusValid();
    await canPayrollDisputeBeMarkedAsResolvedAsync();

    let payrollDispute = await PayrollDisputesRepository.updatePayrollDisputeStatusAsync(id, status);
    await updatePayrollPaymentStatusAsync();

    return formatPayrollDisputeResponseAsync(payrollDispute);

    function isPayrollDisputeStatusValid() {
        if (isNullOrUndefined(status)) {
            throw new BadRequestError('Status cannot be undefined');
        }

        let values = Object.values(PayrollDisputeStatus);
        if (!values.includes(status)) {
            throw new BadRequestError(`Invalid payroll dispute status: ${status}`);
        }
    };

    async function canPayrollDisputeBeMarkedAsResolvedAsync() {
        let { supervisorId, supervisorApproval, managerId, managerApproval } = await checkIfPayrollDisputeExistsAsync(id);

        if (status === PayrollDisputeStatus.Resolved && !managerApproval) {
            throw new UnauthorizedError(`Manager with id '${managerId}' has rejected this dispute. It cannot be resolved.`);
        }

        if (status === PayrollDisputeStatus.Resolved && !supervisorApproval && !managerApproval) {
            throw new UnauthorizedError(`Supervisor with id '${supervisorId}' and manager with id '${managerId}' have rejected this dispute. It cannot be resolved.`);
        }
    };

    async function updatePayrollPaymentStatusAsync() {
        if (payrollDispute.status === PayrollDisputeStatus.Rejected) {
            await PayrollsRepository.updatePayrollAsync(payrollDispute.payrollId, undefined, undefined, undefined, PaymentStatus.Rejected);
        }
    };
};

//#endregion

module.exports = {
    //#region Payrolls
    registerPayrollAsync,
    getPayrollsAsync,
    getTodaysPayrollByEmployeeIdAsync,
    getPayrollsByEmployeeIdAsync,
    updatePayrollPaymentStatusAsync,

    //#endregion

    //#region Payroll Disputes
    registerPayrollDisputeAsync,
    getPayrollDisputesAsync,
    getPayrollDisputeByIdAsync,
    getPayrollDisputesByEmployeeIdAsync,
    getPayrollDisputesBySupervisorIdOrManagerIdAsync,
    updatePayrollDisputeApprovalAsync,
    updatePayrollDisputeStatusAsync

    //#endregion
};
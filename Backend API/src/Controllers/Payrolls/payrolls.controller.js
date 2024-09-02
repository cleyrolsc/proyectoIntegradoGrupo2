const { ok, created } = require("../../Core/Abstractions/Contracts/HttpResponses/http-responses");
const { PayrollDisputeStatus, PaymentStatus } = require("../../Core/Abstractions/Enums");
const { ForbiddenError } = require("../../Core/Abstractions/Exceptions");
const { isNotNullNorUndefined, isNotNullUndefinedNorEmpty, isNullUndefinedOrEmpty, isNullOrUndefined } = require("../../Core/Utils/null-checker.util");
const { fetchEmployeeIdWithAuthTokenAsync, extractPaginationElements, extractDateRange } = require("../../Core/Utils/request-element-extractor.util");

const { PayrollsService } = require("../../Services");

//#region Payrolls
const generatePayrollForDayAsync = async (request, response, next) => {
    try {
        let employeeId = await fetchEmployeeIdWithAuthTokenAsync(request);
        let payrolls = await PayrollsService.registerPayrollAsync(employeeId);

        created(response, request.originalUrl, payrolls);
    } catch (error) {
        next(error);
    }
};

const fetchPayrollsAsync = async (request, response, next) => {
    try {
        let { page, pageSize } = extractPaginationElements(request);
        let { startDate, endDate } = extractDateRange(request);
        let paymentStatus = isNotNullNorUndefined(request.query.paymentStatus) ? +request.query.paymentStatus : undefined;

        let payrolls = await PayrollsService.getPayrollsAsync(paymentStatus, startDate, endDate, page, pageSize);

        ok(response, request.originalUrl, payrolls);
    } catch (error) {
        next(error);
    }
};

const fetchPayrollsByEmployeeIdAsync = async (request, response, next) => {
    try {
        let { page, pageSize } = extractPaginationElements(request);
        let paymentStatus = isNotNullNorUndefined(request.query.paymentStatus) ? +request.query.paymentStatus : undefined;
        let employeeId = request.params.employeeId !== '{employeeId}' && isNotNullUndefinedNorEmpty(request.params.employeeId) ? request.params.employeeId : undefined;
        if (isNullUndefinedOrEmpty(employeeId)) {
            throw new BadRequestError('Employee id cannot be undefined');
        }

        let payrolls = await PayrollsService.getPayrollsByEmployeeIdAsync(employeeId, paymentStatus, page, pageSize);

        ok(response, request.originalUrl, payrolls);
    } catch (error) {
        next(error);
    }
};

const fetchMyPayrollsAsync = async (request, response, next) => {
    try {
        let { page, pageSize } = extractPaginationElements(request);
        let employeeId = await fetchEmployeeIdWithAuthTokenAsync(request);
        let paymentStatus = isNotNullNorUndefined(request.query.paymentStatus) ? +request.query.paymentStatus : undefined;

        let payrolls = await PayrollsService.getPayrollsByEmployeeIdAsync(employeeId, paymentStatus, page, pageSize);

        ok(response, request.originalUrl, payrolls);
    } catch (error) {
        next(error);
    }
};

const fetchMyPayrollForTodayAsync = async (request, response, next) => {
    try {
        let employeeId = await fetchEmployeeIdWithAuthTokenAsync(request);
        let payrolls = await PayrollsService.getTodaysPayrollByEmployeeIdAsync(employeeId);

        ok(response, request.originalUrl, payrolls);
    } catch (error) {
        next(error);
    }
};

const markPayrollAsPaidAsync = async (request, response, next) => {
    try {
        await updatePayrollPaymentStatusAsync(request, response, PaymentStatus.Paid);
    } catch (error) {
        next(error);
    }
};

async function updatePayrollPaymentStatusAsync(request, response, paymentStatus) {
    let payrollId = request.params.payrollId !== '{payrollId}' && isNotNullUndefinedNorEmpty(request.params.payrollId) ? +request.params.payrollId : undefined;
    if (isNullOrUndefined(payrollId)) {
        throw new BadRequestError('Payroll id cannot be undefined');
    }

    let payroll = await PayrollsService.updatePayrollPaymentStatusAsync(payrollId, paymentStatus);

    ok(response, request.originalUrl, payroll);
};

const markPayrollAsRejectedAsync = async (request, response, next) => {
    try {
        await updatePayrollPaymentStatusAsync(request, response, PaymentStatus.Rejected);
    } catch (error) {
        next(error);
    }
};

//#endregion

//#region Payroll Disputes
const registerPayrollDisputeAsync = async (request, response, next) => {
    try {
        let employeeId = await fetchEmployeeIdWithAuthTokenAsync(request);
        let { payrollId, comment, employeeApproval } = request.body;
        if (isNullUndefinedOrEmpty(comment)) {
            throw new BadRequestError('Comment cannot be empty');
        }

        // employeeId, payrollId, comment, employeeApproval
        let payrollDispute = await PayrollsService.registerPayrollDisputeAsync(employeeId, payrollId, comment, employeeApproval);

        created(response, request.originalUrl, payrollDispute);
    } catch (error) {
        next(error);
    }
};

const fetchPayrollDisputesAsync = async (request, response, next) => {
    try {
        let { page, pageSize } = extractPaginationElements(request);
        let payrollDisputes = await PayrollsService.getPayrollDisputesAsync(page, pageSize);

        ok(response, request.originalUrl, payrollDisputes);
    } catch (error) {
        next(error);
    }
};

const fetchPayrollDisputeByIdAsync = async (request, response, next) => {
    try {
        let disputeId = request.params.disputeId;
        if (isNullOrUndefined(disputeId)) {
            throw new BadRequestError('Payroll dispute id cannot be undefined');
        }

        let payrollDispute = await PayrollsService.getPayrollDisputeByIdAsync(disputeId);

        ok(response, request.originalUrl, payrollDispute);
    } catch (error) {
        next(error);
    }
};

const fetchPayrollDisputesByEmployeeIdAsync = async (request, response, next) => {
    try {
        let { page, pageSize } = extractPaginationElements(request);
        let employeeId = request.params.employeeId;

        let payrollDisputes = await PayrollsService.getPayrollDisputesByEmployeeIdAsync(employeeId, page, pageSize);

        ok(response, request.originalUrl, payrollDisputes);
    } catch (error) {
        next(error);
    }
};

const fetchMyPayrollDisputesAsync = async (request, response, next) => {
    try {
        let { page, pageSize } = extractPaginationElements(request);
        let employeeId = await fetchEmployeeIdWithAuthTokenAsync(request);

        let payrollDisputes = await PayrollsService.getPayrollDisputesByEmployeeIdAsync(employeeId, page, pageSize);

        ok(response, request.originalUrl, payrollDisputes);
    } catch (error) {
        next(error)
    }
};

const fetchPayrollDisputeAssignedToSupervisorOrManagerAsync = async (request, response, next) => {
    try {
        let { page, pageSize } = extractPaginationElements(request);
        let employeeId = await fetchEmployeeIdWithAuthTokenAsync(request);

        let payrollDisputes = await PayrollsService.getPayrollDisputesBySupervisorIdOrManagerIdAsync(employeeId, page, pageSize);

        ok(response, request.originalUrl, payrollDisputes);
    } catch (error) {
        next(error);
    }
};

const approvePayrollDisputeAsync = async (request, response, next) => {
    try {
        await updatePayrollDisputeApprovalAsync(request, response, true);
    } catch (error) {
        next(error);
    }
};

async function updatePayrollDisputeApprovalAsync(request, response, approval) {
    let disputeId = request.params.disputeId;
    let employeeId = await fetchEmployeeIdWithAuthTokenAsync(request);

    let payrollDispute = await PayrollsService.updatePayrollDisputeApprovalAsync(disputeId, employeeId, approval);

    ok(response, request.originalUrl, payrollDispute);
};

const rejectPayrollDisputeAsync = async (request, response, next) => {
    try {
        await updatePayrollDisputeApprovalAsync(request, response, false);
    } catch (error) {
        next(error);
    }
};

const markPayrollDisputeAsResolvedAsync = async (request, response, next) => {
    try {
        let disputeId = request.params.disputeId;
        if (isNullOrUndefined(disputeId)) {
            throw new BadRequestError('Payroll dispute id cannot be undefined');
        }

        let payrollDispute = await PayrollsService.getPayrollDisputeByIdAsync(disputeId);
        if (payrollDispute.status === PayrollDisputeStatus.Resolved) {
            return ok(response, request.originalUrl, payrollDispute);
        }

        if (payrollDispute.status === PayrollDisputeStatus.Rejected) {
            throw new ForbiddenError("You cannot resolve a payroll dispute that has been rejected");
        }

        payrollDispute = await PayrollsService.updatePayrollDisputeStatusAsync(disputeId, PayrollDisputeStatus.Resolved);

        ok(response, request.originalUrl, payrollDispute);
    } catch (error) {
        next(error)
    }
};

const markPayrollDisputeAsRejectedAsync = async (request, response, next) => {
    try {
        let disputeId = request.params.disputeId;
        if (isNullOrUndefined(disputeId)) {
            throw new BadRequestError('Payroll dispute id cannot be undefined');
        }

        let payrollDispute = await PayrollsService.getPayrollDisputeByIdAsync(disputeId);
        if (payrollDispute.status === PayrollDisputeStatus.Rejected) {
            return ok(response, request.originalUrl, payrollDispute);
        }

        if (payrollDispute.status === PayrollDisputeStatus.Resolved) {
            throw new ForbiddenError("You cannot reject a payroll dispute that has been resolved");
        }

        payrollDispute = await PayrollsService.updatePayrollDisputeStatusAsync(disputeId, PayrollDisputeStatus.Rejected);

        ok(response, request.originalUrl, payrollDispute);
    } catch (error) {
        next(error)
    }
};

//#endregion

module.exports = {
    //#region Payrolls
    generatePayrollForDayAsync,
    fetchPayrollsAsync,
    fetchPayrollsByEmployeeIdAsync,
    fetchMyPayrollsAsync,
    fetchMyPayrollForTodayAsync,
    markPayrollAsPaidAsync,
    markPayrollAsRejectedAsync,

    //#endregion

    //#region Payroll Disputes
    registerPayrollDisputeAsync,
    fetchPayrollDisputesAsync,
    fetchPayrollDisputeByIdAsync,
    fetchPayrollDisputesByEmployeeIdAsync,
    fetchMyPayrollDisputesAsync,
    fetchPayrollDisputeAssignedToSupervisorOrManagerAsync,
    approvePayrollDisputeAsync,
    rejectPayrollDisputeAsync,
    markPayrollDisputeAsResolvedAsync,
    markPayrollDisputeAsRejectedAsync

    //#endregion

}

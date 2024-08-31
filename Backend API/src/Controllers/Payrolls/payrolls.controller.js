const { isNotNullNorUndefined } = require("../../Core/Utils/null-checker.util");
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

const fetchEmployeePayrollsAsync = async (request, response, next) => {
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

const fetchEmployeePayrollsForTodayAsync = async (request, response, next) => {
    try {
        let employeeId = await fetchEmployeeIdWithAuthTokenAsync(request);
        let payrolls = await PayrollsService.getTodaysPayrollByEmployeeIdAsync(employeeId);
        
        ok(response, request.originalUrl, payrolls);
    } catch (error) {
        next(error);
    }
};

//#endregion

//#region Payroll Disputes

//#endregion

module.exports = {
    //#region Payrolls
    generatePayrollForDayAsync,
    fetchPayrollsAsync,
    fetchEmployeePayrollsAsync,
    fetchEmployeePayrollsForTodayAsync,

    //#endregion

    //#region Payroll Disputes

    //#endregion

}
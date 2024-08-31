
const { PaginatedResponse } = require("../../Core/Abstractions/Contracts/Responses");
const { PaymentStatus, EventType } = require("../../Core/Abstractions/Enums");
const { NotFoundError } = require("../../Core/Abstractions/Exceptions");
const { isNullOrUndefined, isArrayNullUndefinedOrEmpty } = require("../../Core/Utils/null-checker.util");
const { formatPaginatedResponse } = require("../../Core/Utils/response-formatter.util");

const { SchedulesRepository, EmployeesRepository, ComputedHoursRepository } = require("../../Repositories");

const registerComputedHourForTodayAsync = async (employeeId) => {
    let employee = await EmployeesRepository.getEmployeeByIdAsync(employeeId);
    if(isNullOrUndefined(employee)) {
        throw NotFoundError(`Employee with id (${employee}) does not exist`);
    }

    const todayStart = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
    const todayEnd = new Date(new Date().setHours(23, 59, 59, 999)).getTime();
    let { count: schedulesCount, rows: schedules } = await SchedulesRepository.getSchedulesByEmployeeIdAsync(employeeId, todayStart, todayEnd, 0, 1000, 'ASC');
    if(schedulesCount === 0) {
        throw new NotFoundError(`No hours have been recorded today for employee with id '${employeeId}'`);
    }

    let { count: computedHoursCount, rows: todaysComputedHours } = await ComputedHoursRepository.getComputedHoursByEmployeeIdAsync(employeeId, todayStart, todayEnd, PaymentStatus.Pending, 0, 1);
    if(computedHoursCount === 0){
        return await createNewComputedHourAsync();
    } else {
        return await updateExistingComputedHourAsync();
    }

//#region Aux methods
    async function createNewComputedHourAsync() {
        let { totalWorkHours, totalWorkPay } = calculateTotalWorkHoursAndPay(employee.payPerHour);
        let totalBreakHours = calculateTotalBreakHours();
        let { totalTrainingHours, totalTrainingPay } = calculateTotalTrainingHoursAndPay(employee.payPerHour);
        let grossPay = totalWorkPay + totalTrainingPay;

        todaysComputedHours = await ComputedHoursRepository.createComputedHourAsync(employeeId, employee.payPerHour,todayStart, todayEnd, totalWorkHours, totalTrainingHours, totalBreakHours);

        return formatResponse(todaysComputedHours.id, +employee.payPerHour, +totalWorkHours.toFixed(7), 
        totalWorkPay, +totalBreakHours.toFixed(7), +totalTrainingHours.toFixed(7), 
        totalTrainingPay, grossPay, PaymentStatus.Pending);
    };

    function calculateTotalWorkHoursAndPay(payPerHour){
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

    function calculateTotalTrainingHoursAndPay(payPerHour){
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

    async function updateExistingComputedHourAsync() {
        let { totalWorkHours, totalWorkPay } = calculateTotalWorkHoursAndPay(todaysComputedHours[0].payPerHour);
        let totalBreakHours = calculateTotalBreakHours();
        let { totalTrainingHours, totalTrainingPay } = calculateTotalTrainingHoursAndPay(todaysComputedHours[0].payPerHour);
        let grossPay = totalWorkPay + totalTrainingPay;

        await ComputedHoursRepository.updateComputedHourAsync(todaysComputedHours[0].id, totalWorkHours, totalTrainingHours, totalBreakHours);

        return formatResponse(+todaysComputedHours[0].id, +todaysComputedHours[0].payPerHour, +totalWorkHours.toFixed(7), 
        totalWorkPay, +totalBreakHours.toFixed(7), +totalTrainingHours.toFixed(7), 
        totalTrainingPay, grossPay, +todaysComputedHours[0].paymentStatus);
    };
//#endregion
};

const getTodaysComputedHourByEmployeeIdAsync = async (employeeId) => {
    let employee = await EmployeesRepository.getEmployeeByIdAsync(employeeId);
    if(isNullOrUndefined(employee)) {
        throw NotFoundError(`Employee with id (${employee}) does not exist`);
    }

    const todayStart = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
    const todayEnd = new Date(new Date().setHours(23, 59, 59, 999)).getTime();
    let { rows: todaysComputedHours } = await ComputedHoursRepository.getComputedHoursByEmployeeIdAsync(employeeId, todayStart, todayEnd, undefined, 0, 1);
    if (isArrayNullUndefinedOrEmpty(todaysComputedHours)){
        throw new NotFoundError(`No hours have been computed today for employee with id '${employeeId}'`);
    }

    let { id, startDate, endDate, payPerHour, totalWorkingHours: totalWorkHours, payForWorkingHours: totalWorkPay, totalBreakHours: totalBreakHours, totalTrainingHours, payForTrainingHours: totalTrainingPay, paymentStatus} = todaysComputedHours[0];
    
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

const getComputedHoursByEmployeeIdAsync = async (employeeId, paymentStatus = undefined, currentPage = 1, itemsPerPage = 10, order = 'DESC') => {
    let employee = await EmployeesRepository.getEmployeeByIdAsync(employeeId);
    if(isNullOrUndefined(employee)) {
        throw NotFoundError(`Employee with id (${employee}) does not exist`);
    }

    let skip = (currentPage - 1) * itemsPerPage;
    let { count, rows: computedHours } = await ComputedHoursRepository.getComputedHoursByEmployeeIdAsync(employeeId, undefined, undefined, paymentStatus, skip, itemsPerPage, order);
    if (isArrayNullUndefinedOrEmpty(computedHours)){
        return new PaginatedResponse();
    }

    let computedHourModels = [];
    computedHours.forEach(computedHour => {
        let { id, startDate, endDate, payPerHour, totalWorkingHours: totalWorkHours, 
            payForWorkingHours: totalWorkPay, totalBreakHours: totalBreakHours, totalTrainingHours, 
            payForTrainingHours: totalTrainingPay, paymentStatus } = computedHour;
        
        computedHourModels.push({
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
    
    return formatPaginatedResponse(currentPage, itemsPerPage, computedHourModels, count);
};

const getComputedHoursAsync = async (paymentStatus = undefined, startDate = new Date(Date.now() - 86400000).getTime(), endDate = new Date().getTime(), currentPage = 1, itemsPerPage = 10, order = 'DESC') => {
    let skip = (currentPage - 1) * itemsPerPage;
    let { count, rows: computedHours } = await ComputedHoursRepository.getComputedHoursAsync(paymentStatus, startDate, endDate, skip, itemsPerPage, order);
    if (isArrayNullUndefinedOrEmpty(computedHours)){
        return new PaginatedResponse();
    }

    let computedHourModels = [];
    computedHours.forEach(computedHour => {
        let { id, startDate, endDate, employeeId, payPerHour, 
            totalWorkingHours: totalWorkHours, payForWorkingHours: totalWorkPay, 
            totalBreakHours: totalBreakHours, totalTrainingHours, 
            payForTrainingHours: totalTrainingPay, paymentStatus } = computedHour;
        
        computedHourModels.push({
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
    
    return formatPaginatedResponse(currentPage, itemsPerPage, computedHourModels, count);
};

module.exports = {
    registerComputedHourForTodayAsync,
    getTodaysComputedHourByEmployeeIdAsync,
    getComputedHoursByEmployeeIdAsync,
    getComputedHoursAsync,
};
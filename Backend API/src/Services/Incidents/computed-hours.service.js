
const { NotFoundError } = require("../../Core/Abstractions/Exceptions");
const { isNullOrUndefined } = require("../../Core/Utils/null-checker.util");

const { SchedulesRepository, EmployeesRepository } = require("../../Repositories");

const Events = {
    workingStart: 1,
    workingEnd: 2,
    breakStart: 3,
    breakEnd: 4,
    trainingStart: 5,
    trainingEnd: 6,
};

const registerComputedHourForTodayAsync = async (employeeId) => {
    let employee = await EmployeesRepository.getEmployeeByIdAsync(employeeId);
    if(isNullOrUndefined(employee)) {
        throw NotFoundError(`Employee with id (${employee}) does not exist`);
    }

    const todayStart = new Date(new Date().setHours(0, 0, 0, 0)).getTime();
    const todayEnd = new Date(new Date().setHours(23, 59, 59, 999)).getTime();
    let { rows: schedules } = await SchedulesRepository.getSchedulesByEmployeeIdAsync(employeeId, todayStart, todayEnd, 0, 1000, 'ASC');

    let { totalWorkTime, totalWorkPay } = calculateTotalWorkHoursAndPay();
    let totalBreakTime = calculateTotalBreakHours();
    let { totalTrainingTime, totalTrainingPay } = calculateTotalTrainingHoursAndPay();
    let grossPay = totalWorkPay + totalTrainingPay;
    
    return {
        totalWorkTime,
        totalWorkPay: `$${totalWorkPay}`,
        //workHours: {workStartingList,
        //workEndList},
        totalBreakTime,
        //breakHours: {breakStartingList,
        //breakEndList},
        totalTrainingTime,
        totalTrainingPay: `$${totalTrainingPay}`,
        //trainingHours : {trainingStartingList,
        //trainingEndList},
        grossPay: `$${grossPay}`
    };

    function calculateTotalWorkHoursAndPay(){
        let workStartingList = schedules.filter(schedule => schedule.eventId === Events.workingStart);
        let workEndList = schedules.filter(schedule => schedule.eventId === Events.workingEnd);
        let { totalHours: totalWorkTime, totalPay: totalWorkPay } = calculateTotalHoursAndPay(workStartingList, workEndList, employee.payPerHour);

        return { totalWorkTime, totalWorkPay };
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
        let breakStartingList = schedules.filter(schedule => schedule.eventId === Events.breakStart);
        let breakEndList = schedules.filter(schedule => schedule.eventId === Events.breakStart);
        let { totalHours: totalBreakTime } = calculateTotalHoursAndPay(breakStartingList, breakEndList);

        return totalBreakTime;
    };

    function calculateTotalTrainingHoursAndPay(){
        let trainingStartingList = schedules.filter(schedule => schedule.eventId === Events.trainingStart);
        let trainingEndList = schedules.filter(schedule => schedule.eventId === Events.trainingEnd);
        let { totalHours: totalTrainingTime, totalPay: totalTrainingPay } = calculateTotalHoursAndPay(trainingStartingList, trainingEndList, employee.payPerHour);

        return { totalTrainingTime, totalTrainingPay };
    };
};

module.exports = {
    registerComputedHourForTodayAsync
};
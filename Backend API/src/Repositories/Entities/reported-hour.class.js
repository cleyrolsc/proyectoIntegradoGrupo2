class ReportedHour{
    id; // PK
    eventDate;
    eventId; // FK Events
    employeeId; // FK Employees
};

module.exports = ReportedHour;
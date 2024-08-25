CREATE TABLE IF NOT EXISTS computedHours(
id INTEGER PRIMARY KEY AUTO_INCREMENT,
startDate DATETIME NOT NULL,
endDate DATETIME NOT NULL,
employeeId INTEGER NOT NULL,
employeeIdentificationNumber VARCHAR(20) NOT NULL,
payPerHour DECIMAL(7,2) NOT NULL,
totalWorkingHours DECIMAL(7,2) NOT NULL,
payForWorkingHours DECIMAL(7,2) NOT NULL,
totalTrainingHours DECIMAL(7,2) NOT NULL,
payForTrainingHours DECIMAL(7,2) NOT NULL,
totalBreakHours DECIMAL(7,2) NOT NULL,
createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY (employeeId) REFERENCES employees(id)
);

ALTER TABLE incidents
ADD employeeApproval BOOLEAN default null;

ALTER TABLE incidents
ADD supervisorApproval BOOLEAN default null;

ALTER TABLE incidents
ADD managerApproval BOOLEAN default null;

ALTER TABLE incidents
ADD computedHourId integer not null;

ALTER TABLE incidents
ADD FOREIGN KEY (computedHourId) REFERENCES computedhours(id);

ALTER TABLE employees
MODIFY COLUMN payPerHour DECIMAL(7,2) NOT NULL;
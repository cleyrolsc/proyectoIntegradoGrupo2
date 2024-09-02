CREATE TABLE IF NOT EXISTS departments(
id INTEGER PRIMARY KEY AUTO_INCREMENT,
description TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS positions(
id INTEGER PRIMARY key AUTO_INCREMENT,
description TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS employees(
id VARCHAR(100) PRIMARY KEY,
firstName VARCHAR(100) NOT NULL,
lastName VARCHAR(100) NOT NULL,
departmentId INTEGER NOT NULL,
supervisorId VARCHAR(100),
positionId INTEGER NOT NULL,
payPerHour DECIMAL(7,2) DEFAULT 0.0,
createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
updatedAt DATETIME DEFAULT NULL,

FOREIGN KEY (departmentId) REFERENCES departments(id),
FOREIGN KEY (supervisorId) REFERENCES employees(id),
FOREIGN KEY (positionId) REFERENCES positions(id)
);

CREATE TABLE IF NOT EXISTS privileges(
name VARCHAR(30) PRIMARY KEY,
level INTEGER NOT NULL,
status INTEGER DEFAULT 2, /* active */
createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
updatedAt DATETIME DEFAULT NULL
);

CREATE TABLE IF NOT EXISTS users(
username VARCHAR(30) PRIMARY KEY,
password VARCHAR(255) NOT NULL,
employeeId VARCHAR(100) NOT NULL UNIQUE,
type INTEGER DEFAULT 2, /* agent */
privilegeId VARCHAR(30) NOT NULL,
privilegeSuspended BOOLEAN DEFAULT 0,
status INTEGER DEFAULT 2, /* active */
createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
updatedAt DATETIME DEFAULT NULL,

FOREIGN KEY (employeeId) REFERENCES employees(id),
FOREIGN KEY (privilegeId) REFERENCES privileges(name)
);

CREATE TABLE IF NOT EXISTS payrolls(
id INTEGER PRIMARY KEY AUTO_INCREMENT,
startDate DATETIME NOT NULL,
endDate DATETIME NOT NULL,
employeeId VARCHAR(100) NOT NULL,
payPerHour DECIMAL(7,2) NOT NULL,
totalWorkingHours DECIMAL(9,4) NOT NULL,
payForWorkingHours DECIMAL(7,2) NOT NULL,
totalTrainingHours DECIMAL(9,4) NOT NULL,
payForTrainingHours DECIMAL(7,2) NOT NULL,
totalBreakHours DECIMAL(9,4) NOT NULL,
paymentStatus INTEGER DEFAULT 0, /* pending */
createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
updatedAt DATETIME DEFAULT NULL,

FOREIGN KEY (employeeId) REFERENCES employees(id)
);

CREATE TABLE IF NOT EXISTS payroll_disputes(
id INTEGER PRIMARY KEY AUTO_INCREMENT,
employeeId VARCHAR(100) NOT NULL,
payrollId INTEGER NOT NULL,
comment TEXT NOT NULL,
employeeApproval BOOLEAN DEFAULT NULL,
supervisorId VARCHAR(100) NOT NULL,
supervisorApproval BOOLEAN DEFAULT NULL,
managerId VARCHAR(100) NOT NULL,
managerApproval BOOLEAN DEFAULT NULL,
status INTEGER DEFAULT 0, /* pending */
createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
updatedAt DATETIME DEFAULT NULL,

FOREIGN KEY (employeeId) REFERENCES employees(id),
FOREIGN KEY (payrollId) REFERENCES payrolls(id),
FOREIGN KEY (supervisorId) REFERENCES employees(id),
FOREIGN KEY (managerId) REFERENCES employees(id)
);

CREATE TABLE IF NOT EXISTS events(
id INTEGER PRIMARY KEY AUTO_INCREMENT,
description TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS schedules(
id INTEGER PRIMARY KEY AUTO_INCREMENT,
eventDate BIGINT NOT NULL,
eventId INTEGER NOT NULL,
employeeId VARCHAR(100) NOT NULL,
createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
updatedAt DATETIME DEFAULT NULL,

FOREIGN KEY (eventId) REFERENCES events(id),
FOREIGN KEY (employeeId) REFERENCES employees(id)
);
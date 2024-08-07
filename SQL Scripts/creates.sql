CREATE TABLE IF NOT EXISTS departments(
id INTEGER PRIMARY KEY AUTOINCREMENT,
description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS positions(
id INTEGER PRIMARY key AUTOINCREMENT,
description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS employees(
id INTEGER PRIMARY KEY AUTOINCREMENT,
firstName VARCHAR(100) NOT NULL,
lastName VARCHAR(100) NOT NULL,
identificationNumber VARCHAR(20) NOT NULL,
departmentId INTEGER NOT NULL,
supervisorId INTEGER,
positionId INTEGER NOT NULL,
payPerHour INTEGER NOT NULL,
createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
updatedAt DATETIME,

FOREIGN KEY (departmentId) REFERENCES departments(id),
FOREIGN KEY (supervisorId) REFERENCES employees(id),
FOREIGN KEY (positionId) REFERENCES positions(id)
);

CREATE TABLE IF NOT EXISTS privileges(
name VARCHAR(30) PRIMARY KEY,
level INTEGER NOT NULL,
status INTEGER DEFAULT 2, /* active */
createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
updatedAt DATETIME
);

CREATE TABLE IF NOT EXISTS users(
username VARCHAR(30) PRIMARY KEY,
password VARCHAR(255) NOT NULL,
employeeId INTEGER NOT NULL UNIQUE,
type INTEGER DEFAULT 2, /* agent */
privilegeId VARCHAR(30) NOT NULL,
privilegeSuspended bool DEFAULT 0,
status INTEGER DEFAULT 2, /* active */
createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
updatedAt DATETIME,

FOREIGN KEY (employeeId) REFERENCES employees(id),
FOREIGN KEY (privilegeId) REFERENCES privileges(name)
);

CREATE TABLE IF NOT EXISTS incidents(
id INTEGER PRIMARY KEY AUTOINCREMENT,
comment TEXT NOT NULL,
employeeId INTEGER NOT NULL,
createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY (employeeId) REFERENCES employees(id)
);

CREATE TABLE IF NOT EXISTS events(
id INTEGER PRIMARY KEY AUTOINCREMENT,
description TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS reportedHours(
id INTEGER PRIMARY KEY AUTOINCREMENT,
eventDate DATETIME DEFAULT CURRENT_TIMESTAMP,
eventId INTEGER NOT NULL,
employeeId INTEGER NOT NULL,

FOREIGN KEY (eventId) REFERENCES events(id),
FOREIGN KEY (employeeId) REFERENCES employees(id)
);
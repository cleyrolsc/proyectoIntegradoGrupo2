INSERT INTO departments (description) VALUES 
("Call Center"),
("Management"),
("Accounting");

Select * From departments;

INSERT INTO events (description) VALUES 
("Working Starts"),
("Working Stops"),
("Break Starts"),
("Break Stops"),
("Training Starts"),
("Training Stops");

Select * From events;

INSERT INTO positions (description) VALUES 
("Manager"),
("Agent"),
("Accountant");

Select * From positions;

INSERT INTO privileges (name, level, status) VALUES 
("user-agent", 1, 2),
("user-accountant", 98, 2),
("admin-manager", 99, 2),
("admin-super", 100, 2);

Select * From privileges;

INSERT INTO employees (id, firstName, lastName, identificationNumber, departmentId, supervisorId, positionId, payPerHour) VALUES 
(1, 'admin', 'super', '', 2, 1, 1, 0.0),
(2, 'Djidjelly', 'Siclait', 'ABCD-1234', 2, 1, 1, 150.0),
(3, 'John', 'Doe', 'ABCD-1235', 2, 1, 1, 80.0);

Select * From employees;

INSERT INTO users(username, password, employeeId, type, privilegeId, privilegeSuspended, status) VALUES 
('admin', '$2a$10$inCJSoyNHMNf/gqdKC9RoesazTUTUgaFAUex25aJUslAgF2DvxH9y', 1, 100, 'admin-super', FALSE, 2),
('djsiclait', '$2a$10$inCJSoyNHMNf/gqdKC9RoesazTUTUgaFAUex25aJUslAgF2DvxH9y', 2, 99, 'admin-manager', FALSE, 2),
('admin', '$2a$10$inCJSoyNHMNf/gqdKC9RoesazTUTUgaFAUex25aJUslAgF2DvxH9y', 3, 1, 'user-agent', FALSE, 2);

Select * From users;
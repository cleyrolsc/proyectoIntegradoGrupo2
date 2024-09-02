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

INSERT INTO employees (id, firstName, lastName, departmentId, supervisorId, positionId, payPerHour) VALUES 
('E-0001', 'admin', 'super', 2, 'E-0001', 1, 0.0),
('E-0002', 'Djidjelly', 'Siclait', 2,'E-0001', 1, 150.0),
('E-0003', 'John', 'Doe', 2, 'E-0002', 1, 80.0);

Select * From employees;

INSERT INTO users(username, password, employeeId, type, privilegeId, privilegeSuspended, status) VALUES 
('admin', '$2a$10$inCJSoyNHMNf/gqdKC9RoesazTUTUgaFAUex25aJUslAgF2DvxH9y', 'E-0001', 100, 'admin-super', FALSE, 2),
('djsiclait', '$2a$10$inCJSoyNHMNf/gqdKC9RoesazTUTUgaFAUex25aJUslAgF2DvxH9y', 'E-0002', 99, 'admin-manager', FALSE, 2),
('johndoe', '$2a$10$inCJSoyNHMNf/gqdKC9RoesazTUTUgaFAUex25aJUslAgF2DvxH9y', 'E-0003', 1, 'user-agent', FALSE, 2);

Select * From users;
ALTER TABLE incidents
ADD status integer not null default 0;

ALTER TABLE incidents
ADD supervisorId VARCHAR(100) not null;

ALTER TABLE incidents
ADD FOREIGN KEY (supervisorId) REFERENCES employees(id);
ALTER TABLE incidents
ADD status integer not null default 0;

ALTER TABLE incidents
ADD supervisorId integer not null;

ALTER TABLE incidents
ADD FOREIGN KEY (supervisorId) REFERENCES employees(id);
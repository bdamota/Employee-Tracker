DROP TABLE IF EXISTS employee-tracker;

CREATE DATABASE employee_tracker;
USE employee_tracker;


CREATE TABLE department (
  id INTEGER PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
);

CREATE TABLE roles (
  id INTEGER PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL (10.0), 
  department_id INTEGER PRIMARY KEY, 
);
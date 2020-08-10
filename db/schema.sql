DROP TABLE IF EXISTS employee_tracker;

CREATE DATABASE employee_tracker;
USE employee_tracker;


CREATE TABLE department (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL (10.0), 
  department_id INTEGER,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employees (
  id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER, 
  CONSTRAINT fk_party FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
  manager_id INTEGER 
);
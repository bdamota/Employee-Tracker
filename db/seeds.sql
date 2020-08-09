INSERT INTO department (dept_name)
VALUES
  ('HR'),
  ('Finance'),
  ('Engineering'),
  ('Design');


INSERT INTO roles (title, salary, department_id)
VALUES
  ('HR Director', 90000, 1),
  ('Recruiter', 50000, 1),
  ('VP of Finance', 150000, 2),
  ('Finance Manager', 65000, 2),
  ('Head of Engineering', 300000, 3),
  ('Software Engineer', 100000, 3),
  ('Head of Design', 200000, 4),
  ('Product Manager', 80000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('John', 'Smith', 1, NULL),
  ('Carl', 'Phillips', 2, 1),
  ('Jane', 'Doe', 3, NULL),
  ('Shelly', 'Crane', 4, 3),
  ('Scott', 'Dean', 5, NULL),
  ('Shawn', 'Johnson', 6, 5),
  ('Sarah', 'Reed', 7, NULL),
  ('Jake', 'Jones', 8, 7);
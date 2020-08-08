INSERT INTO department (dept_name)
VALUES
  ('HR'),
  ('Finance'),
  ('Engineering'),
  ('Design');


INSERT INTO roles (title, salary, department_id)
VALUES
  ('HR Director', 90,000, 1),
  ('VP of Finance', 150,000, 2),
  ('Software Engineer', 100,000, 3),
  ('Head of Design', 200,000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('John', 'Smith', 1, 1),
  ('Jane', 'Doe', 2, 3),
  ('Scott', 'Dean', 3, NULL),
  ('Sarah', 'Reed', 4, 5);
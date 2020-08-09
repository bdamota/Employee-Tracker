const inquirer = require('inquirer');
const showTable = require('console.table');

const connection = require('./db/database');
const { getDepartments, getEmployees, getRoles } = require('./db/query.js')

//Prompts 
function initialOptions() {
    inquirer
    .prompt({
      type: "list",
      name: "search",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update an Employee Role",
        "Exit"
    ]
  
    }).then (function (answer) {
      switch (answer.search) {
            case "View All Departments":
              viewAllDepartments();
              break;
  
            case "View All Roles":
              viewAllRoles();
              break;
  
            case "View All Employees":
               viewAllEmployees();
               break;
  
            case "Add a Department":
              addDepartment();
              break;
  
            case "Add a Role":
              addRole();
              break;
  
            case "Add an Employee":
                addEmployee();
                break;
  
            case "Update an Employee Role":
                updateEmployeeRole();
                break;
            
            case "Exit":
                console.log("Application Exited.");
                connection.end();
                break
      }
    })
  };

  function viewAllDepartments() {
    //query to view all departments
    const query = connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err
        console.log("All Deparments: \n");
        console.table(res);
        initialOptions();
    });
  };

  function viewAllRoles() {
    //query to view roles with department ID returned with name
    const query = connection.query("SELECT roles.id, roles.title, roles.salary, dept_name as department FROM roles JOIN department ON roles.department_id = department.id", function (err, res) {
        if (err) throw err
        console.log("Employee Roles: \n")
        console.table(res);
        initialOptions();
    });
  };

  function viewAllEmployees() {
    const query = connection.query("SELECT e1.id, e1.first_name, e1.last_name, roles.title as role, dept_name AS department, roles.salary, Concat(e2.first_name, ' ', e2.last_name) AS manager FROM employees e1 LEFT JOIN roles ON e1.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employees e2 ON e2.id = e1.manager_id", function (err, res) {
        if (err) throw err
        console.log ("\n All Employee Info: \n");
        console.table(res);
        initialOptions();
    });
  };

  function addDepartment() {
    inquirer.prompt ({
        type: 'input',
        name: 'department',
        message: 'What is the name of the new department?'
    }).then(function(input) {
        const query = connection.query(
          'INSERT INTO department SET ?',
          {
            dept_name: input.department
          },
          function(err, res) {
            if (err) throw err;
            console.log('Department added!\n');
            initialOptions();
          });
    });
    
  };
  
  

  initialOptions();
  
  
  

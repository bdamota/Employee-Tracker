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
        console.log("All Deparments. \n");
        console.table(res);
        initialOptions();
    });
  };

  function viewAllRoles() {
    //query to view roles with department ID returned with name
    const query = connection.query("SELECT roles.id, roles.title, roles.salary, department.name as department FROM roles JOIN department ON roles.department_id = departments.id", function (err, res) {
        if (err) throw err
        console.log("Roles. \n")
        console.table(res);
        initialOptions();
    });
  };
  
  
  

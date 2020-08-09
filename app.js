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
  

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
              promptRole();
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

  function promptRole() {
    inquirer.prompt([
        {
            // Prompt user role title
            type: "input",
            name: "roleTitle",
            message: "Enter the role title: "
        },
        {
            // Prompt user for salary
            type: "number",
            name: "salary",
            message: "Enter the role salary: "
        },
        {   
            // Prompt user to select department role is under
            type: "list",
            name: "department",
            message: "Enter the department of the role: ",
            choices: departmentNamesArr
        }])
        .then((response) => {   
            let departmentID
            for (let i=0; i < departmentArray.length; i++) {
              if (response.department === departmentArray[i].name) {
                departmentID = departmentArray[i].id;
                break
              }
            }
  
          // Added role to role table
          connection.query('INSERT INTO roles SET ?',
            {
              title: response.roleTitle,
              salary: parseFloat(response.salaryInput),
              department_id: departmentID
            },
            function(err, res) {
              if (err) throw err;
              console.log(response.roleTitle + ' added to roles!\n');
              initialOptions();
            });
        });

  
  function addRole() {
    getDepartments()
    .then((rows) => {
        let departmentNamesArr = []
        let departmentArray = rows[0]
        for (var i=0; i < departmentArray.length; i++) {  
          let department = departmentArray[i].name;
          console.log(department)
          departmentNamesArr.push(department)
        }
        initialOptions();
    });
};

  
    

  function addEmployee() {
    getEmployees()
    .then((employees) => {
      let employeeNamesArr = []
      let employeesArray = employees[0]
      for (var i=0; i < employeesArray.length; i++) {
        let employee = employeesArray[i].first_name + ' ' + employeesArray[i].last_name
        employeeNamesArr.push(employee)
      }
      //add null option in array
      employeeNamesArr.unshift('--')
      getRoles()
       .then((roles) => {
        let roleTitlesArr = []
        let rolesArray = roles[0]
        for (var i=0; i < rolesArray.length; i++) {
          let role = rolesArray[i].title
          roleTitlesArr.push(role)
        }

          inquirer.prompt ([
          {
            type: 'input',
            name: 'firstName',
            message: 'Enter the first name of the employee: '
          },
          {
            type: 'input',
            name:'lastName',
            message: 'Enter the last name of the employee: '
          },
          {
            type: 'list',
            name: 'role',
            message: 'Choose the role of the employee: ',
            choices: roleTitlesArr
          },
          {
            type: 'list',
            name: 'manager',
            message: 'Choose the manager of the employee: ',
            choices: employeeNamesArr
          }])
          .then(function(input) {
            let roleID
            for (let i=0; i < rolesArray.length; i++) {
              if (input.role === rolesArray[i].title) {
              roleID = rolesArray[i].id;
              break
              }
            }

            let managerID
            for (let i=0; i < employeesArray.length; i++) {
              if (input.manager === employeesArray[i].first_name + ' ' + employeesArray[i].last_name) {
                managerID = employeesArray[i].id;
                break
              }
            }
            const query = connection.query( 'INSERT INTO employees SET ?',
              {
                first_name: input.firstName,
                last_name: input.lastName,
                role_id: roleID,
                manager_id: managerID
              },
              function(err, res) {
                if (err) throw err;
                console.log('Employee added!\n');
                initialOptions();
              });
        });
      });
    });
};  

function updateEmployeeRole() {
    getEmployees()
      .then((employees) => {
        let employeeNamesArr = []
        let employeesArray = employees[0]
        for (var i=0; i < employeesArray.length; i++) {
          let employee = employeesArray[i].first_name + ' ' + employeesArray[i].last_name
          employeeNamesArr.push(employee)
        }
        getRoles()
        .then((roles) => {
           let roleTitlesArr = []
           let rolesArray = roles[0]
           for (var i=0; i < rolesArray.length; i++) {
             let role = rolesArray[i].title
             roleTitlesArr.push(role)
           }
  
           inquirer.prompt([
             {
               type: "list",
               name: "employee",
               message: "Which employee's role would you like to update?",
               choices: employeeNamesArr
             },
             {
               type: "list",
               name: "role",
               message: "What is their new role?",
               choices: roleTitlesArr
             }])
           .then((input) => {
            let roleID
            for (let i=0; i < rolesArray.length; i++) {
              if (input.role === rolesArray[i].title) {
              roleID = rolesArray[i].id;
              break
              }
            }
  
            let employeeID
            for (let i=0; i < employeesArray.length; i++) {
              if (input.employee === employeesArray[i].first_name + ' ' + employeesArray[i].last_name) {
                employeeID = employeesArray[i].id;
                break
              }
            }
            // Update employee role
            connection.query('UPDATE employees SET ? WHERE ?', [
                    {
                      role_id: roleID
                    },
                    {
                      id: employeeID
                    }
                  ],
                  function(err, res) {
                    if (err) throw err;
                    console.log('Role updated!\n');
                    initialOptions();
                  }
              );
            });
          });
      });
  };
  }
  
  initialOptions();
  
  


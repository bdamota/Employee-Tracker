const mysql = require('mysql2');


// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    // Your MySQL username
    user: 'root',
    // Your MySQL password
    password: 'Duchess0506!',
    database: 'employee_tracker'
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database.")
});

module.exports = connection;
const inquirer = require('inquirer');
const showTable = require('console.table');

const connection = require('./db/database');
const { getDepartments, getEmployees, getRoles } = require('./db/query.js')

const inquirer = require("inquirer");
const mysql = require('mysql2');

const PORT = 3001;

//connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'company_db'
    },
    console.log('connected to company_db')
);

// query database

db.query(`'SELECT * FROM departments`, function (err, results){
    console.log(results);
});


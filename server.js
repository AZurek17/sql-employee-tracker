const inquirer = require("inquirer");
const mysql = require('mysql2');
const cTable = require('console.table');


//AddDepartment questions
function addDepartment() {
    inquirer
     .prompt([
    {
        type: "input",
        name: "department",
        message: "Enter a name for the department.",
    }
    ])
    .then((response) => {
        db.query(`INSERT INTO department (name)VALUES("${response.department}");`)
        console.log(`ADDED Department to database`) 
        init()   
    })
    };

//AddRole questions
function addRole() {
    inquirer
     .prompt ([
        {
            type: "input",
            name: "role_name",
            message: "Enter role name"
        },
        {
            type: "number",
            name: "salary",
            message: "Enter role salary"
        }
        // {
        //     type: "list",
        //     name: "department",
        //     message: "Pick a department",
        //     choices: [
        //         //db.query('SHOW')
        //     ]
        // }
     ])
     .then((response) => {
        
        db.query(`INSERT INTO role (title) VALUES("${response.role_name}");`);
        db.query(`INSERT INTO role (salary) VALUES("${response.salary}");`);
        // db.query(`INSERT INTO role (department_id) VALUES("${response.department}");`);
        
        console.log(`ADDED role to database`)
        init()
    })
};

//addEmployee questions
function addEmployee(pick) {
    
    inquirer
     .prompt ([
        {
            type: "input",
            name: "first_name",
            message: "Enter first name"
        },
        {
            type: "input",
            name: "last_name",
            message: "Enter last name"
        },
        {
            type: "list",
            name: "employee_role",
            message: "Enter employe role",
            choices: (pick),

        }
        // {
        //     type: "list",
        //     name: "employee_id",
        //     message: "Enter employee manager"
        // }
     ])
     .then((response) => {
        db.query(`INSERT INTO employee (first_name, last_name) VALUES("${response.first_name}","${response.last_name}");`)
        
        // db.query(`INSERT INTO employee (role_id) VALUES("${response.employee_role}");`)
        // db.query(`INSERT INTO employee (manager_id) VALUES("${r.employee_id}");`)
        console.log(`ADDED new employee to database`)
        init()
    })
};

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

//-------------------
function init() {
  inquirer
    .prompt ([
        {
            type: "list",
            message: "What would you like to do?",
            name: "selected",
            choices: [
                "view all departments",
                "view all roles",
                "view all employees",
                "add a department",
                "add a role",
                "add an employee",
                "update employee role"
            ],
        },
    ])
    .then((response) => {
        // console.log(response)
       //const answer = "";

        if ((response.selected) === "view all departments") {
            db.query(`SELECT * FROM department`, function (err, results){
                if (err){
                    console.log(err);
                }
                console.table(results);
                init();
            });
        }
        else if ((response.selected) === "view all roles") {
            db.query(`SELECT * FROM role`, function (err, results){
                if (err){
                    console.log(err);
                }
                console.log(results)
                init()
            })
        }
        else if ((response.selected) === "view all employees") {
            db.query(`SELECT * FROM employee`, function (err, results){
                if (err){
                    console.log(err);
                }
                console.table(results)
                init()
            })
        }
        else if ((response.selected) === "add a department") {
            db.query(`SELECT * FROM role`, function (err, results){
                if (err){
                  console.log(err);
                }
                const roleChoices = results.map((row) => row.role);
                addDepartment(roleChoices);
            });
            
            
        }
        else if ((response.selected) === "add a role") {
            addRole()
        }
        else if ((response.selected) === "add an employee") {
            addEmployee()
        }
        else if ((response.selected) === "update employee role") {
            updateEmployee()
        }

    })
}

//start of program
console.log(`______________________________________________________

EMPLOYEE

MANAGER

_____________________________________________________

`
);
init();

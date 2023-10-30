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
        
        db.query(`INSERT INTO role (title, salary) VALUES("${response.role_name}","${response.salary}");`);
        //db.query(`INSERT INTO role (salary) VALUES("${response.salary}");`);
        // db.query(`INSERT INTO role (department_id) VALUES("${response.department}");`);
        
        console.log(`ADDED role to database`)
        init()
    })
};

//addEmployee questions
function addEmployee() {
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
        }
     ])
     .then((response) => {
        const nameFirst = response.first_name;
        const nameLast = response.last_name;
        db.promise().query(`SELECT * FROM role`).then(([results]) => {
            // console.log(results)

            const roleChoices = results.map(({id,title}) => ({name: title, value: id}));

            inquirer
            .prompt([
                {
                    type: "list",
                    name: "employee_role",
                    message: "Enter employe role",
                    choices: roleChoices
                            
                }
            ]).then((response) => {
                const roleId = response.employee_role;
                db.promise().query(`SELECT * FROM employee`).then(([results]) => {
                    // console.log(results)

                    const managerChoices = results.map(({id, first_name, last_name}) => ({name: `${first_name} ${last_name}`, value: id}));
                
                inquirer
                .prompt([
                {
                    type: "list",
                    name: "manager_id",
                    message: "Enter employee manager",
                    choices: managerChoices,
                           
                }
                ]).then((response) => {

                    const newEmployee = {first_name: nameFirst, last_name: nameLast, role_id: roleId, manager_id: response.manager_id}
                
                    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES("${nameFirst}","${nameLast}","${roleId}","${response.manager_id}");`)
                    console.log(`ADDED new employee to database`)
                    init()
                })
                
            })
            
        })    
    })   
})

}

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

        if ((response.selected) === "view all departments") {
            db.promise().query(`SELECT * FROM department`).then(([results]) => {
                console.table(results);
                init();
            }) 
        }
        else if ((response.selected) === "view all roles") {
            db.promise().query(`SELECT * FROM role`).then(([results]) => {
                console.log(results)
                init()
            })
        }
        else if ((response.selected) === "view all employees") {
            db.promise().query(`SELECT * FROM employee`).then(([results]) => {
                console.table(results)
                init()
            })
        }
        else if ((response.selected) === "add a department") {
            addDepartment();
        }
        else if ((response.selected) === "add a role") {
            addRole();
        }
        else if ((response.selected) === "add an employee") {
            addEmployee();
        }
        else if ((response.selected) === "update employee role") {
            updateEmployee();
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

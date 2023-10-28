const inquirer = require("inquirer");

//starting questions
const questions = [
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
        ]
    }
];

//AddDepartment questions
function addDepartment() {
    inquirer
     .prompt([
    {
        type: "input",
        name: "department",
        message: "Enter the name of the department?",
    }
    ])
    .then((response) => {
        console.log(response)
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
        },
        {
            type: "list",
            name: "department",
            message: "Enter role salary"
        }
     ])
     .then((response) => {
        console.log(response)
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
        },
        {
            type: "input",
            name: "employee_role",
            message: "Enter employe role"
        },
        {
            type: "input",
            name: "employee_id",
            message: "Enter employe manager"
        }
     ])
     .then((response) => {
        console.log(response)
    })
};

function init() {
    inquirer
    .prompt (questions)
    .then((response) => {
        console.log(response)

        if (response === "view all departments") {
            viewAllDepartments();

        }
        else if (response === "view all roles") {
            viewAllRoles();
        }
        else if (response === "view all employees") {
            viewAllEmployees();
        }
        else if (response === "add a department") {
            AddDepartment();
        }
        else if (response === "add a role") {
            AddRole();
        }
        else if (response === "add an employee") {
            AddEmployee();
        }
        else if (response === "update employee role") {
            UpdateEmployee();
        }

    })
}

init()
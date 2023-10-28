const inquirer = require("inquirer");

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

function init() {
    inquirer
    .prompt (questions)
    .then((response) => {
        console.log(response)

        if (response === "view all departments") {

        }
        else if (response === "view all roles") {
            
        }
        else if (response === "view all employees") {
            
        }
        else if (response === "add a department") {

        }
        else if (response === "add a role") {

        }
        else if (response === "add an employee") {
            
        }
        else if (response === "update employee role") {
            
        }

    })
}

init()
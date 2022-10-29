const inquirer = require("inquirer");
const fs = require("fs");

//on init
//create variable for prompt list: view dep, view roles, view employees, add dep, add role, add employ, update emplyee role
const initialPrompt = [
  {
    type: "list",
    message: "What would you liek to do?",
    name: "choose-path",
    choices: [{
        message: "View departments",
        value: "view_departments",
      },
      {
        message: "View roles",
        value: "view_roles",
      },
      {
        message: "View employees",
        value: "view_employees",
      },
      {
        message: "Add departments",
        value: "add_departments",
      },
      {
        message: "Add roles",
        value: "add_roles",
      },
      {
        message: "Add employees",
        value: "add_employees",
      },
      {
        message: "Update employees",
        value: "update_employees",
      }],
  },
];

function initPrompt() {
    inquirer.prompt(initialPrompt).then({
        
    })
}
//when i choose "add dep"
//creat variavle for prompt: enter name of dep
//name added to DB

//when i choose "add role"
//creat variavle for prompt: enter name of role, salary, department for role
//role is added to DB

//when i choose "add employee"
//creat variavle for prompt: enter employee first nae, last name, role, manager
//emplyee added to DB

//when i choose "update role"
//i am prompted to select an employee to update (from DB) and then will be given additional optiont o update role
// updated meployee added to DB

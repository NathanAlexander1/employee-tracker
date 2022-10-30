const inquirer = require("inquirer");
const fs = require("fs");
const sqltbl = require("console.table");
const db = require("./db/connection");
//on init
//create variable for prompt list: view dep, view roles, view employees, add dep, add role, add employ, update emplyee role
// db.query(console.table(results))

const initialPrompt = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "choosepath",
    choices: [
      {
        name: "View departments",
        value: "view_departments",
      },
      {
        name: "Add departments",
        value: "add_department",
      },
      {
        name: "View roles",
        value: "view_roles",
      },
      {
        name: "Add roles",
        value: "add_role",
      },
      {
        name: "View employees",
        value: "view_employees",
      },
      {
        name: "Add employees",
        value: "add_employee",
      },
      {
        name: "Update employee",
        value: "update_employee",
      },
      {
        name: "Quit",
        value: "quit",
      },
    ],
  },
];

const addDepartmentPrompt = [
  {
    type: "input",
    message: "What is your department called?",
    name: "new_department",
  },
];

const addRolePrompt = [
  {
    type: "input",
    message: "What is your new role called?",
    name: "new_role",
  },
  {
    type: "input",
    message: "What is your new role salary?",
    name: "new_salary",
  },
  {
    type: "input",
    message: "What is your new role department?",
    name: "new_role_department",
  }
];
      //promts user to enter employee first name, last name, role, manager
const addEmployeePrompt = [
  {
    type: "input",
    message: "What is your new employee's first name?",
    name: "new_employee_first",
  },
  {
    type: "input",
    message: "What is your new employee's last name?",
    name: "new_employee_last",
  },
  {
    type: "input",
    message: "What is your new employee's role?",
    name: "new_employee_role",
  },
  {
    type: "input",
    message: "Who is your new employee's manager?",
    name: "new_employee_manager",
  }
];

function initPrompt() {
  inquirer.prompt(initialPrompt).then((responses) => {
    console.log("prompt worked!");
    if (responses.choosepath === "view_departments") {
      //presents user with a formatted table showing dep names and ids
      console.log("I want to view departments!");
      initPrompt();
    } else if (responses.choosepath === "add_department") {

      inquirer.prompt(addDepartmentPrompt).then((responses) => {
        console.log(`Your new department is ${responses.new_department}`);
        //function to add department to database
        initPrompt();
      });
    } else if (responses.choosepath === "view_roles") {
      //presents user with formatted table showing job title, role id, department of role, salary of role
      console.log("I want to view roles!");
      initPrompt();
    } else if (responses.choosepath === "add_role") {

      inquirer.prompt(addRolePrompt).then((responses) => {
        console.log(`Youre new role is: ${responses.new_role} with a salary of ${responses.new_salary} and belongs to the ${responses.new_role_department} department`);
        //function to add role to database
        //roll is added to database
        initPrompt();
      });
    } else if (responses.choosepath === "view_employees") {
      //presents user with a formattd table showing employee id, first name, last name, job title, department, salary, and managers
      console.log("I want to view employees!");
      initPrompt();
    } else if (responses.choosepath === "add_employee") {

      inquirer.prompt(addEmployeePrompt).then((responses) => {
        console.log(`Your new employee's is: ${responses.new_employee_first} ${responses.new_employee_last}. They are a ${responses.new_employee_role} and report to ${responses.new_employee_manager}`);
        //function to add employee to database
        initPrompt();
      });
    } else if (responses.choosepath === "update_employee") {
      //prmpts user to slect employee to update, inputs new role
      //puts into database
      console.log("I want to update an employee");
      initPrompt();
    } else {
      console.log("I want to quit the program");
    }
  });
}

// function choosePathway () {
//     if (responses.choosepath === "view_departments") {
//         //run appropriate function
//         console.log("I want to view departments!")
//       }
// }

initPrompt();
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

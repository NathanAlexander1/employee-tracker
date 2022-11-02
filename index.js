const inquirer = require("inquirer");
const fs = require("fs");
require("console.table");
const db = require("./db/connection");
//on init
//create variable for prompt list: view dep, view roles, view employees, add dep, add role, add employ, update emplyee role

// const getDepartments = () => {
//   db.query("SELECT departments.name FROM departments", function (err, results) {
//     console.log(results);
//     let choicesARR = results.map((department) => {
//       return department.name;
//     });
//     console.log(choicesARR);
//     return choicesARR;
//   });
// };

// const depts = getDepartments()
// console.log("depts:", depts)
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

const getAddRolePrompts = () => {
  db.query("SELECT * FROM departments", function (err, results) {
    // console.log(results);
    let choicesARR = results.map((department) => {
      return { name: department.name, value: department.id };
    });
    // console.log(choicesARR);

    const questions = [
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
        type: "list",
        message: "What is your new role department?",
        name: "new_role_department",
        choices: choicesARR,
      },
    ];
    inquirer.prompt(questions).then((responses) => {
      console.log(responses);
      db.query(
        "INSERT INTO roles SET ?",
        {
          title: responses.new_role,
          salary: responses.new_salary,
          department_id: responses.new_role_department,
        },
        function (err, results) {
          if (err) {
            console.log(err);
          }
          console.log("inserted");
          initPrompt();
        }
      );
    });
  });
};

const getAddEmployeePrompts = () => {
  db.query("SELECT * FROM roles", function (err, results) {
    // console.log(results);
    let rolesArr = results.map((role) => {
      return {
        name: role.title,
        value: role.id,
      };
    });
    console.log(rolesArr);

    db.query("SELECT * FROM employees", function (err, results) {
      console.log(results);
      let managerArr = results.map((employee) => {
        return {
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        };
      });
      const employeeQuestions = [
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
          type: "list",
          message: "What is your new employee's role?",
          name: "new_employee_role",
          choices: rolesArr,
        },
        {
          type: "list",
          message: "Who does this employee report to?",
          name: "new_employee_manager",
          choices: managerArr,
        },
      ];
      inquirer.prompt(employeeQuestions).then((responses) => {
        // console.log(responses);
        db.query(
          "INSERT INTO employees SET ?",
          {
            first_name: responses.new_employee_first,
            last_name: responses.new_employee_last,
            role_id: responses.new_employee_role,
            manager_id: responses.new_employee_manager,
          },
          function (err, results) {
            if (err) {
              console.log(err);
            }
            console.log("inserted");
            initPrompt();
          }
        );
      });
    });
  });
};

const updateEmployeeRole = () => {
  db.query("SELECT * FROM employees", function (err, results) {
    // console.log(results);
    let employeeArr = results.map((employee) => {
      return {
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      };
    });
    // console.log(rolesArr);

    db.query("SELECT * FROM roles", function (err, results) {
      let rolesArr = results.map((role) => {
        return {
          name: role.title,
          value: role.id,
        };
      });
      console.log(results);

      const employeeQuestions = [
        {
          type: "list",
          message: "Which employee role would you like to update?",
          name: "which_role",
          choices: employeeArr,
        },
        {
          type: "list",
          message: "What will this employee's new role be?",
          name: "new_role",
          choices: rolesArr,
        },
      ];
      inquirer.prompt(employeeQuestions).then((responses) => {
        // console.log(responses);
        db.query(
          "UPDATE employees SET role_id = ? WHERE id = ?",
          [responses.new_role, responses.which_role],
          function (err, results) {
            if (err) {
              console.log(err);
            }
            console.log("inserted");
            initPrompt();
          }
        );
      });
    });
  });
};

//promts user to enter employee first name, last name, role, manager

function initPrompt() {
  inquirer.prompt(initialPrompt).then((responses) => {
    if (responses.choosepath === "view_departments") {
      //presents user with a formatted table showing dep names and ids
      db.query("SELECT * FROM departments", function (err, results) {
        console.log("\n");
        console.table(results);
      });
      initPrompt();
    } else if (responses.choosepath === "add_department") {
      inquirer.prompt(addDepartmentPrompt).then((responses) => {
        db.query(
          "INSERT INTO departments SET ?",
          { name: responses.new_department },
          function (err, results) {
            console.table(results);
          }
        );

        console.log(`Your new department is ${responses.new_department}`);
        //function to add department to database
        initPrompt();
      });
    } else if (responses.choosepath === "view_roles") {
      //presents user with formatted table showing job title, role id, department of role, salary of role
      db.query(
        "SELECT roles.id, roles.title, roles.salary, departments.name FROM roles JOIN departments ON roles.department_id=departments.id",
        function (err, results) {
          console.table(results);
        }
      );
      console.log("I want to view roles!");
      initPrompt();
    } else if (responses.choosepath === "add_role") {
      getAddRolePrompts();
    } else if (responses.choosepath === "view_employees") {
      //presents user with a formattd table showing employee id, first name, last name, job title, department, salary, and managers
      db.query(
        `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM employees 
      JOIN roles 
      ON employees.role_id = roles.id
      LEFT JOIN departments
      ON roles.department_id=departments.id
      LEFT JOIN employees manager
      ON manager.id = employees.manager_id`,
        function (err, results) {
          console.table(results);
        }
      );
      console.log("I want to view employees!");
      initPrompt();
    } else if (responses.choosepath === "add_employee") {
      getAddEmployeePrompts();
      //function to add employee to database
    } else if (responses.choosepath === "update_employee") {
      //prmpts user to slect employee to update, inputs new role
      //puts into database
      updateEmployeeRole();
      // console.log("I want to update an employee");
    } else {
      console.log("I want to quit the program");
    }
  });
}

initPrompt();

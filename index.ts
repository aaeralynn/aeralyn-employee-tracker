import inquirer from "inquirer";
import Db from "./db/index";

const db = new Db();

initialPrompts();

function initialPrompts() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          {
            name: "View All Employees",
            value: "View_Employees",
          },
          {
            name: "Add Employee",
            value: "Add_Employee",
          },
          {
            name: "Remove Employee",
            value: "Remove_Employee",
          },
          {
            name: "Add Role",
            value: "Add_Role",
          },
          {
            name: "Remove Role",
            value: "Remove_Role",
          },
          {
            name: "Add Department",
            value: "Add_Department",
          },

          {
            name: "Remove Department",
            value: "Remove_Department",
          },
          {
            name: "View All Departments",
            value: "View_Departments",
          },
          {
            name: "Exit",
            value: "Exit",
          },
        ],
      },
    ])
    .then((res) => {
      const choice = res.choice;
      console.log("choice", choice);
    });
}

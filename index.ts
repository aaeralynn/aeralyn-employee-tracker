import inquirer from "inquirer";
import Db from "./db/index";

const db = new Db();

initialPrompts();

function initialPrompts() {
  inquirer.prompt([
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
      ],
    },
  ]);
}

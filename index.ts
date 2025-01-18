import inquirer from "inquirer";
import Db from "./db/index.ts";

const db = new Db();

initialPrompts();

function initialPrompts() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: ["View All Employees", "Add Employee", "Update Employee Role"],
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case "Add Task":
          addTask();
          break;
        case "View Tasks":
          viewTasks();
          break;
        case "Exit":
          console.log("Goodbye!");
          process.exit();
      }
    });
}

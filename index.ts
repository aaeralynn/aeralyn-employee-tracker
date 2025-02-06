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
            name: "View All Roles",
            value: "View_Roles",
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
      const choice = res.action;
      switch (choice) {
        case "View_Employees":
          viewEmployees();
          break;
        case "Add_Employee":
          addEmployee();
          break;
        case "Remove_Employee":
          removeEmployee();
          break;
        case "View_Roles":
          viewRoles();
          break;
        case "Add_Role":
          addRole();
          break;
        case "Remove_Role":
          removeRole();
          break;
        case "Add_Department":
          addDepartment();
          break;
        case "Remove_Department":
          removeDepartment();
          break;
        case "View_Departments":
          viewDepartments();
          break;
        case "Exit":
          exit();
          break;
        default:
          break;
      }
    });
}

function viewEmployees() {
  db.findEmployees()
    .then((res) => {
      const employees = res.rows; // Access the rows correctly
      if (employees && employees.length > 0) {
        console.table(employees); // Display the employees in a table format
      } else {
        console.log("No employees found."); // Handle case where no employees are returned
      }
    })
    .catch((error) => {
      console.error("Error retrieving employees:", error); // Handle any errors
    })
    .finally(() => initialPrompts()); // Ensure prompts are shown again after the operation
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "first_name",
        message: "What is the employee's first name?",
      },
      {
        name: "last_name",
        message: "What is the employee's last name?",
      },
    ])
    .then((res) => {
      const firstName = res.first_name;
      const lastName = res.last_name;

      db.findAllRoles().then((rolesRes) => {
        const roles = rolesRes.rows;
        const roleChoices = roles.map((role) => ({
          name: role.title,
          value: role.id,
        }));

        inquirer
          .prompt({
            type: "list",
            name: "role_id",
            message: "What is the employee's role?",
            choices: roleChoices,
          })
          .then((res) => {
            const roleId = res.role_id;

            db.findEmployees().then((res) => {
              const employees = res.rows;
              const managerChoices = employees.map((employee) => {
                const id = employee.id;
                const firstName = employee.first_name;
                const lastName = employee.last_name;
                return {
                  name: `${firstName} ${lastName}`,
                  value: id,
                };
              });
              managerChoices.unshift({ name: "None", value: null });

              inquirer
                .prompt({
                  type: "list",
                  name: "manager_id",
                  message: "Who is the employee's manager?",
                  choices: managerChoices,
                })
                .then((res) => {
                  const employee = {
                    firstName: firstName,
                    lastName: lastName,
                    roleId: roleId,
                    managerId: res.manager_id,
                  };

                  db.addNewEmployee(
                    employee.firstName,
                    employee.lastName,
                    employee.roleId,
                    employee.managerId
                  );
                });
            });
          });
      });
    });
}

function removeEmployee() {}

function viewRoles() {}

function addRole() {}

function removeRole() {}

function addDepartment() {}

function removeDepartment() {}

function viewDepartments() {}

function exit() {
  console.log("Goodbye!");
  process.exit();
}

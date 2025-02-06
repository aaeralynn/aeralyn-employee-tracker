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
                })
                .then(() => {
                  console.log("Employee added successfully.");
                  initialPrompts();
                })
                .catch((error) => {
                  console.error("Error adding employee:", error);
                  initialPrompts();
                });
            });
          });
      });
    });
}

function removeEmployee() {
  db.findEmployees()
    .then((res) => {
      const employees = res.rows;
      const employeeChoices = employees.map((employee) => ({
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id,
      }));

      inquirer
        .prompt({
          type: "list",
          name: "employee_id",
          message: "Which employee would you like to remove?",
          choices: employeeChoices,
        })
        .then((res) => {
          const employeeId = res.employee_id;

          db.removeEmployee(employeeId)
            .then(() => {
              console.log("Employee removed successfully.");
              initialPrompts();
            })
            .catch((error) => {
              console.error("Error removing employee:", error);
              initialPrompts();
            });
        });
    })
    .catch((error) => {
      console.error("Error retrieving employees:", error);
      initialPrompts();
    });
}

function viewRoles() {
  db.findAllRoles()
    .then((res) => {
      const roles = res.rows;
      if (roles && roles.length > 0) {
        console.table(roles);
      } else {
        console.log("No roles found.");
      }
    })
    .catch((error) => {
      console.error("Error retrieving roles:", error);
    })
    .finally(() => initialPrompts());
}

function addRole() {
  inquirer
    .prompt([
      {
        name: "title",
        message: "What is the title of the role?",
      },
      {
        name: "salary",
        message: "What is the salary for this role?",
      },
    ])
    .then((res) => {
      const title = res.title;
      const salary = res.salary;

      db.query("SELECT * FROM departments", [])
        .then((res) => {
          const departments = res.rows;
          const departmentChoices = departments.map((department) => ({
            name: department.name,
            value: department.id,
          }));

          inquirer
            .prompt({
              type: "list",
              name: "department_id",
              message: "Which department does this role belong to?",
              choices: departmentChoices,
            })
            .then((res) => {
              const role = {
                title: title,
                salary: salary,
                departmentId: res.department_id,
              };

              db.query(
                "INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)",
                [role.title, role.salary, role.departmentId]
              );
            })
            .then(() => {
              console.log("Role added successfully.");
              initialPrompts();
            })
            .catch((error) => {
              console.error("Error adding role:", error);
              initialPrompts();
            });
        })
        .catch((error) => {
          console.error("Error retrieving departments:", error);
          initialPrompts();
        });
    });
}

function removeRole() {
  db.findAllRoles()
    .then((res) => {
      const roles = res.rows;
      const roleChoices = roles.map((role) => ({
        name: role.title,
        value: role.id,
      }));

      inquirer
        .prompt({
          type: "list",
          name: "role_id",
          message: "Which role would you like to remove?",
          choices: roleChoices,
        })
        .then((res) => {
          const roleId = res.role_id;

          db.query("DELETE FROM role WHERE id = $1", [roleId])
            .then(() => {
              console.log("Role removed successfully.");
              initialPrompts();
            })
            .catch((error) => {
              console.error("Error removing role:", error);
              initialPrompts();
            });
        });
    })
    .catch((error) => {
      console.error("Error retrieving roles:", error);
      initialPrompts();
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "name",
        message: "What is the name of the department?",
      },
    ])
    .then((res) => {
      const name = res.name;

      db.query("INSERT INTO departments (name) VALUES ($1)", [name])
        .then(() => {
          console.log("Department added successfully.");
          initialPrompts();
        })
        .catch((error) => {
          console.error("Error adding department:", error);
          initialPrompts();
        });
    });
}

function removeDepartment() {
  db.query("SELECT * FROM departments", [])
    .then((res) => {
      const departments = res.rows;
      const departmentChoices = departments.map((department) => ({
        name: department.name,
        value: department.id,
      }));

      inquirer
        .prompt({
          type: "list",
          name: "department_id",
          message: "Which department would you like to remove?",
          choices: departmentChoices,
        })
        .then((res) => {
          const departmentId = res.department_id;

          db.query("DELETE FROM departments WHERE id = $1", [departmentId])
            .then(() => {
              console.log("Department removed successfully.");
              initialPrompts();
            })
            .catch((error) => {
              console.error("Error removing department:", error);
              initialPrompts();
            });
        });
    })
    .catch((error) => {
      console.error("Error retrieving departments:", error);
      initialPrompts();
    });
}

function viewDepartments() {
  db.query("SELECT * FROM departments", [])
    .then((res) => {
      const departments = res.rows;
      if (departments && departments.length > 0) {
        console.table(departments);
      } else {
        console.log("No departments found.");
      }
    })
    .catch((error) => {
      console.error("Error retrieving departments:", error);
    })
    .finally(() => initialPrompts());
}

function exit() {
  console.log("Goodbye!");
  process.exit();
}

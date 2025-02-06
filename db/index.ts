import { pool } from "./connections";

export default class Db {
  constructor() {}

  async query(sql: string, args: any[]) {
    const client = await pool.connect();
    try {
      const res = await client.query(sql, args);
      return res; // Ensure you return the result
    } catch (error) {
      console.error("Database query error:", error); // Improved error logging
      throw error; // Rethrow the error to handle it in the calling function
    } finally {
      client.release();
    }
  }

  async findEmployees() {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, departments.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
                 FROM employee 
                 LEFT JOIN role ON employee.role_id = role.id 
                 LEFT JOIN departments ON role.department_id = departments.id 
                 LEFT JOIN employee AS manager ON employee.manager_id = manager.id;`;
    return this.query(sql, []); // Ensure this returns the result of the query
  }

  addNewEmployee(
    firstName: string,
    lastName: string,
    roleId: number,
    managerId: number
  ) {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`;
    return this.query(sql, [firstName, lastName, roleId, managerId]);
  }

  findAllRoles() {
    return this.query(
      `SELECT role.id, role.title, departments.name AS department, role.salary 
         FROM role 
         LEFT JOIN departments ON role.department_id = departments.id;`,
      []
    );
  }

  addRole(title: string, salary: number, departmentId: number) {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)`;
    return this.query(sql, [title, salary, departmentId]);
  }

  removeRole(id: number) {
    return this.query(`DELETE FROM role WHERE id = $1`, [id]);
  }

  removeEmployee(id: number) {
    return this.query(`DELETE FROM employee WHERE id = $1`, [id]);
  }

  addDepartment(name: string) {
    const sql = `INSERT INTO departments (name) VALUES ($1)`;
    return this.query(sql, [name]);
  }

  viewDepartments() {
    return this.query(`SELECT * FROM departments`, []);
  }

  removeDepartment(id: number) {
    return this.query(`DELETE FROM departments WHERE id = $1`, [id]);
  }
}

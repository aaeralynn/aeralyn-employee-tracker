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
    // Implementation for adding a new employee
  }

  findAllRoles() {
    return this.query(
      `SELECT role.id, role.title, department.name
    AS department, role.salary FROM role LEFT JOIN department on
    role.department_id = department.id;`,
      []
    );
  }
}

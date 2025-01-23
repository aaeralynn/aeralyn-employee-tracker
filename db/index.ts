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
    const sql = `SELECT * FROM employee`;
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
}

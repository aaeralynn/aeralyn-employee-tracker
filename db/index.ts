import { pool } from "./connections";

export default class Db {
  constructor() {}
  async query(sql: string, args: any[]) {
    const client = await pool.connect();
    try {
      const res = await client.query(sql, args);
      return res;
    } catch (error) {
      console.error(error);
    } finally {
      client.release();
    }
  }

  findEmployees() {
    const sql = `SELECT * FROM employees`;
    return this.query(sql, []);
  }
}

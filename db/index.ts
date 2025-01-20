import { pool } from "./connections";

export default class Db {
  constructor() {}
  async query(sql: string, params?: any[]) {
    const client = await pool.connect();
    client.release();
  }
}

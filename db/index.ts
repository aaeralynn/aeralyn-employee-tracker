import { pool } from "./connections";

export default class db {
  constructor() { }
  async query(sql: string, params?: any[]) {
    const client = await pool.connect();
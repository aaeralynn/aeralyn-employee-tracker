import { pool } from "./conections";

export default class Database {
  static async query(text: string, params?: any[]) {
    const client = await pool.connect();
    try {
      const
  res = await client.query(text, params);
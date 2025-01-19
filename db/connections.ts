import dotenv from "dotenv";
dotenv.config();

import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432", 10),
});

const connectDb = async () => {
  try {
    await pool.connect();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
  process.exit(1);
};

export { connectDb, pool };

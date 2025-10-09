// config/db.js
import dotenv from "dotenv";
dotenv.config(); // ✅ load .env di sini

import pkg from "pg";
const { Pool } = pkg;

// cek apakah DATABASE_URL kebaca
console.log("📌 DATABASE_URL =", JSON.stringify(process.env.DATABASE_URL));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect()
  .then(() => console.log("✅ PostgreSQL connected via Pool"))
  .catch((err) => console.error("❌ DB connection error:", err.message));

export default pool;

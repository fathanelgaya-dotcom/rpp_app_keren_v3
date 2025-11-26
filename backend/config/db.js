// config/db.js
import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const { Pool } = pkg;

// Log untuk memastikan benar
console.log("📌 DATABASE_URL =", process.env.DATABASE_URL ? "LOADED" : "MISSING");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Jangan panggil pool.connect()
// Pool akan otomatis membuat koneksi saat query dijalankan.

pool.on("error", (err) => {
  console.error("⚠️ Unexpected error on idle client:", err.message);
  // Jangan reconnect manual, biarkan Pool yang mengatur
});

export default pool;


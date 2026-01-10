// config/db.js
import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const { Pool } = pkg;

// Log status env (aman)
console.log("📌 DATABASE_URL =", process.env.DATABASE_URL ? "LOADED" : "MISSING");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },

  // ⬇️ DIPERKETAT (ANTI HANG + HEMAT NEON)
  connectionTimeoutMillis: 3000, // max 3 detik nunggu DB
  idleTimeoutMillis: 10000,      // idle cepat dilepas
  max: 5,                        // batasi koneksi
});

// Jangan pool.connect()
// Pool auto-handle

pool.on("error", (err) => {
  console.error("⚠️ PG pool error:", err.message);
});

export default pool;


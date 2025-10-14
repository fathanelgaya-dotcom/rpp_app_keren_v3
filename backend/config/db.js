// config/db.js
import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const { Pool } = pkg;

console.log("📌 DATABASE_URL =", JSON.stringify(process.env.DATABASE_URL));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  idleTimeoutMillis: 30000, // tutup koneksi idle setelah 30 detik
  connectionTimeoutMillis: 10000, // batasi waktu tunggu koneksi
});

// Auto reconnect handler
pool.on("error", (err) => {
  console.error("⚠️ Unexpected error on idle client", err.message);
  setTimeout(() => {
    console.log("🔁 Reconnecting to database...");
    pool.connect().catch((e) => console.error("❌ Reconnect failed:", e.message));
  }, 3000);
});

pool.connect()
  .then(() => console.log("✅ PostgreSQL connected via Pool"))
  .catch((err) => console.error("❌ DB connection error:", err.message));

export default pool;

// config/db.js
import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// 🩵 Log koneksi sukses
pool.on("connect", () => {
  console.log("✅ PostgreSQL connected via Pool");
});

// 🔁 Auto-reconnect handler
pool.on("error", (err) => {
  console.error("⚠️ Lost connection to database:", err.message);
  setTimeout(() => {
    console.log("🔄 Reconnecting to database...");
    pool.connect().catch((err) => console.error("❌ Reconnect failed:", err.message));
  }, 5000);
});

// 🧪 Tes koneksi awal
(async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("🟢 Initial DB check OK");
  } catch (err) {
    console.error("❌ Initial DB connection failed:", err.message);
  }
})();

export default pool;

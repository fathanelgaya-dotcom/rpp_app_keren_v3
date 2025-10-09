import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pool from "./config/db.js";    // koneksi PostgreSQL
import bcrypt from "bcryptjs";
import rppRoutes from "./routes/rppRoutes.js"; // ✅ mount router

const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());

// log request
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.originalUrl);
  next();
});

// =======================
// REGISTER
// =======================
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ ok: false, error: "username & password required" });
  }

  try {
    const hash = bcrypt.hashSync(password, 10);
    const q = `
      INSERT INTO users (username, password_hash)
      VALUES ($1, $2)
      RETURNING id, username, created_at
    `;
    const r = await pool.query(q, [username, hash]);
    res.json({ ok: true, user: r.rows[0] });
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// =======================
// LOGIN
// =======================
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ ok: false, error: "username & password required" });
  }

  try {
    const r = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    if (!r.rows.length) return res.status(400).json({ ok: false, error: "invalid user" });

    const user = r.rows[0];
    const match = bcrypt.compareSync(password, user.password_hash);
    if (!match) return res.status(400).json({ ok: false, error: "wrong password" });

    res.json({ ok: true, user: { id: user.id, username: user.username, generate_count: user.generate_count || 0 } });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// =======================
// ROUTES
// =======================
app.use("/api", rppRoutes);  // ✅ Mount router rppRoutes

import exportRoutes from "./routes/exportRoutes.js";

app.use("/api", exportRoutes); // ✅ tambahkan ini setelah rppRoutes

// =======================
// START SERVER
// =======================
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

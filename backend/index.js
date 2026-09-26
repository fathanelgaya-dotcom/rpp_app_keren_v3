import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pool from "./config/db.js";    // PostgreSQL
import bcrypt from "bcryptjs";

// Routes
import rppRoutes from "./routes/rppRoutes.js";
import exportRoutes from "./routes/exportRoutes.js";

// DB helper (fast-fail, no hang)
const dbQuery = async (q, params = []) => {
  try {
    return await pool.query(q, params);
  } catch (err) {
    if (err.code === "ETIMEDOUT" || err.message?.includes("timeout")) {
      throw new Error("DB_NOT_READY");
    }
    throw err;
  }
};

const app = express();

// =======================
// MIDDLEWARE
// =======================
app.use(cors());
app.use(bodyParser.json());

// Log setiap request
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.originalUrl);
  next();
});

// =======================
// REGISTER (FAST-FAIL, NO HANG)
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

    const r = await dbQuery(q, [username, hash]);

    return res.json({ ok: true, user: r.rows[0] });
  } catch (err) {
    if (err.message === "DB_NOT_READY") {
      return res.status(503).json({
        ok: false,
        error: "Server sedang menyiapkan database, silakan coba lagi sebentar.",
      });
    }

    console.error("Register error:", err.message);
    return res.status(500).json({ ok: false, error: "Register gagal" });
  }
});

// =======================
// LOGIN (FAST-FAIL, NO HANG)
// =======================
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body || {};

  if (!username || !password) {
    return res.status(400).json({ ok: false, error: "username & password required" });
  }

  try {
    const r = await dbQuery(
      "SELECT * FROM users WHERE username = $1",
      [username]
    );
    if (!r.rows.length) {
      return res.status(400).json({ ok: false, error: "invalid user" });
    }

    const user = r.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(400).json({ ok: false, error: "wrong password" });
    }

    return res.json({
      ok: true,
      user: {
        id: user.id,
        username: user.username,
        generate_count: user.generate_count || 0,
      },
    });
  } catch (err) {
    if (err.message === "DB_NOT_READY") {
      return res.status(503).json({
        ok: false,
        error: "Server sedang menyiapkan database, silakan coba lagi sebentar.",
      });
    }

    console.error("Login error:", err.message);
    return res.status(500).json({ ok: false, error: "Login gagal" });
  }
});

// =======================
// API ROUTES
// =======================
app.use("/api", rppRoutes);
app.use("/api", exportRoutes);

// =======================
// HEALTH CHECK (AMAN DIPING)
// TIDAK ADA QUERY DATABASE
// =======================
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// =======================
// START SERVER
// =======================
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


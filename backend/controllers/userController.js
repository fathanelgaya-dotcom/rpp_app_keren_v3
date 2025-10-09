// controllers/userController.js
import bcrypt from "bcryptjs";
import db from "../config/db.js";

/* -------------------------------
   Register User
---------------------------------*/
export const registerUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ ok: false, error: "Username & password required" });

  try {
    // cek username sudah ada atau belum
    const existing = await db.query("SELECT id FROM users WHERE username=$1", [username]);
    if (existing.rows.length > 0) {
      return res.status(400).json({ ok: false, error: "Username already exists" });
    }

    // hash password
    const hashed = bcrypt.hashSync(password, 10);

    // insert user baru
    const result = await db.query(
      "INSERT INTO users (username, password_hash, generate_count) VALUES ($1,$2,0) RETURNING id, username, generate_count",
      [username, hashed]
    );

    return res.json({ ok: true, user: result.rows[0] });
  } catch (err) {
    console.error("Register error:", err.message);
    return res.status(500).json({ ok: false, error: err.message });
  }
};

/* -------------------------------
   Login User
---------------------------------*/
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ ok: false, error: "Username & password required" });

  try {
    // cari user
    const result = await db.query(
      "SELECT id, username, password_hash, generate_count FROM users WHERE username=$1",
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ ok: false, error: "Invalid username or password" });
    }

    const user = result.rows[0];

    // cek password
    const match = bcrypt.compareSync(password, user.password_hash);
    if (!match) {
      return res.status(400).json({ ok: false, error: "Invalid username or password" });
    }

    return res.json({
      ok: true,
      user: {
        id: user.id,
        username: user.username,
        generate_count: user.generate_count
      }
    });
  } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).json({ ok: false, error: err.message });
  }
};

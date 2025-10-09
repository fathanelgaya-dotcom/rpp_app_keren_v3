import { generateWithAI } from "../config/aiConfig.js";
import { buildMock } from "../utils/mockupGenerator.js";
import pool from "../config/db.js";

/* ============= CONTROLLER FUNCTIONS ============= */

// Generate RPP pakai AI (OpenAI → fallback)
export const generateRPP = async (req, res) => {
  const input = req.body || {};

  if (!input || !input.namaMadrasah || !input.mataPelajaran) {
    return res.status(400).json({ ok: false, error: "Data input tidak lengkap" });
  }

  try {
    // Build prompt untuk AI
    const prompt = `
Susun RPP dalam format JSON valid sesuai struktur fallback:
${JSON.stringify(buildMock(input), null, 2)}

Isi data sesuai input:
${JSON.stringify(input, null, 2)}

Hasilkan JSON valid, jangan ubah key apapun.
`;

    // 1️⃣ Coba AI
    let rpp = await generateWithAI(prompt);

    // 2️⃣ Kalau gagal, pakai fallback
    if (!rpp) rpp = buildMock(input);

    // 3️⃣ Simpan ke DB
    try {
      await pool.query(
        `INSERT INTO rpp (user_id, data) VALUES ($1, $2)`,
        [input.userId || null, rpp]
      );
    } catch (err) {
      console.warn("⚠️ DB insert skipped:", err.message);
    }

    // 4️⃣ Response ke frontend
    res.json({ ok: true, data: rpp });

  } catch (err) {
    console.error("❌ generateRPP error:", err.message);
    res.status(500).json({ ok: false, error: err.message, data: buildMock(input) });
  }
};

// Ambil semua RPP user
export const getRPPByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const q = `SELECT id, data, created_at FROM rpp WHERE user_id=$1 ORDER BY created_at DESC`;
    const r = await pool.query(q, [userId]);
    res.json({ ok: true, list: r.rows });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
};

// Ambil RPP by id
export const getRPPById = async (req, res) => {
  try {
    const { id } = req.params;
    const r = await pool.query(`SELECT id, data, created_at FROM rpp WHERE id=$1`, [id]);
    if (!r.rows.length) return res.status(404).json({ ok: false, error: "not found" });
    res.json({ ok: true, rpp: r.rows[0] });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
};

// Hapus RPP by id
export const deleteRPP = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(`DELETE FROM rpp WHERE id=$1`, [id]);
    res.json({ ok: true, message: "RPP deleted" });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
};

// backend/routes/rppRoutes.js
// NOTE: Untuk cocok dengan frontend (POST -> /api/generate-rpp),
// mount router ini di index.js dengan: app.use('/api', rppRoutes);

import express from "express";
import {
  generateRPP,
  getRPPByUser,
  getRPPById,
  deleteRPP
} from "../controllers/rppController.js";

const router = express.Router();

// Middleware validasi payload untuk generate RPP
function validateGeneratePayload(req, res, next) {
  const required = [
    "namaMadrasah",
    "mataPelajaran",
    "fase",
    "kelas",
    "tema",
    "tahunAjaran",
    "alokasiWaktu",
    "cp",
    "profilLulusan",
    "topikKBC",
    "praktekPedagogik",
    "userId"
  ];

  const missing = required.filter((k) => {
    const v = req.body?.[k];
    return v === undefined || v === null || (typeof v === "string" && v.trim() === "");
  });

  if (missing.length > 0) {
    return res.status(400).json({
      ok: false,
      error: "Missing required fields",
      missing
    });
  }

  // Normalize some fields (optional but helps konsistensi)
  req.body.namaMadrasah = String(req.body.namaMadrasah).trim();
  req.body.mataPelajaran = String(req.body.mataPelajaran).trim();
  req.body.fase = String(req.body.fase).trim();
  req.body.kelas = String(req.body.kelas).trim();
  req.body.tema = String(req.body.tema).trim();
  req.body.tahunAjaran = String(req.body.tahunAjaran).trim();
  req.body.alokasiWaktu = String(req.body.alokasiWaktu).trim();
  req.body.cp = String(req.body.cp).trim();
  req.body.profilLulusan = String(req.body.profilLulusan).trim();
  req.body.topikKBC = String(req.body.topikKBC).trim();
  req.body.praktekPedagogik = String(req.body.praktekPedagogik).trim();

  next();
}

// Endpoint: dipakai frontend -> POST /api/generate-rpp
router.post("/generate-rpp", validateGeneratePayload, generateRPP);

// Endpoint ambil semua RPP milik user
// GET /api/rpp/user/:userId
router.get("/rpp/user/:userId", getRPPByUser);

// Endpoint ambil RPP spesifik berdasarkan ID
// GET /api/rpp/:id
router.get("/rpp/:id", getRPPById);

// Endpoint hapus RPP berdasarkan ID
// DELETE /api/rpp/:id
router.delete("/rpp/:id", deleteRPP);

export default router;

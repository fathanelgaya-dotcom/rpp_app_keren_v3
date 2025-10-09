// routes/exportRoutes.js
import express from "express";
import { exportWord } from "../controllers/exportController.js";

const router = express.Router();

// 🟩 Rute sesuai frontend App.jsx
// Frontend mengirim POST ke http://localhost:4000/api/export-word
router.post("/export-word", exportWord);

export default router;

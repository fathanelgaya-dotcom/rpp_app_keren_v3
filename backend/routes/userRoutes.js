// routes/userRoutes.js
import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";

const router = express.Router();

/* -------------------------------
   User Routes
---------------------------------*/

// Registrasi user baru
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

export default router;

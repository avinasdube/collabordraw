// importing dependencies and controllers
import express from "express";
import { login, signup } from "../controllers/authController.js";

// defining router
const router = express.Router();

// setting routes
router.post("/signup", signup);
router.post("/login", login);

export default router;
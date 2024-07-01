// importing dependencies and controllers
import express from "express";
import { getLoggedInUserDetails, login, signup } from "../controllers/authController.js";
import { verifyJWT } from '../middlewares/authMiddleware.js';

// defining router
const router = express.Router();

// setting routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/userdetails", verifyJWT, getLoggedInUserDetails);

export default router;
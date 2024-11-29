import express from "express";
import { addUser, getTransactionHistory } from "../controllers/userController.js";

const router = express.Router();

// Add new user
router.post("/", addUser);

// Get the user's transaction history
router.get("/:id/transactions", getTransactionHistory);

export default router;

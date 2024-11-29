import express from "express";
import { addBook, borrowBook, returnBook } from "../controllers/bookController.js";

const router = express.Router();

// Add new book
router.post("/", addBook);

// Borrow book
router.put("/:id/borrow", borrowBook);

// Return book
router.put("/:id/return", returnBook);

export default router;


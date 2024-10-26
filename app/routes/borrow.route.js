const express = require("express");
const {
	updateBorrow,
	deleteBorrow,
	getBorrowsByUserId,
	getAllBorrows,
	getCurrentUserBorrow,
	createBorrow,
} = require("../controllers/borrow.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

// Get all borrow records for a user
router.get("/my_borrows", protect, getCurrentUserBorrow);
router.get("/:id", protect, getBorrowsByUserId);
// Get all borrow records
router.get("/", protect, getAllBorrows);

// Create a new borrow record
router.post("/", protect, createBorrow);

// Update a borrow record
router.put("/:id", protect, updateBorrow);
router.patch("/:id", protect, updateBorrow);

// Delete a borrow record
router.delete("/:id", protect, deleteBorrow);

module.exports = router;

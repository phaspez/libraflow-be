const express = require("express");
const router = express.Router();
const {
	createUser,
	deleteUser,
	getUserById,
	getUsers,
	updateUser,
	loginUser,
	getCurrentUser,
} = require("../controllers/user.controller");
const {
	protect,
	authorize,
	authenticateToken,
} = require("../middleware/auth.middleware");

router.post("/register", createUser);

router.post("/login", loginUser);

router.get("/me", protect, getCurrentUser);

router.get("/:id", protect, getUserById);

router.get("/", protect, authorize("staff", "admin"), getUsers);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;

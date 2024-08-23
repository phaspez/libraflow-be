const express = require("express");
const router = express.Router();
const {
	createUser,
	deleteUser,
	getUserById,
	getUsers,
	updateUser,
} = require("../controllers/user.controller");

router.get("/", getUsers);

router.post("/", createUser);

router.get(":/id", getUserById);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;

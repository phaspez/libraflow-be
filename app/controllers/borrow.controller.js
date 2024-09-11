//const User = require("../models/User");
const Borrow = require("../models/Borrow");
const User = require("../models/User");

const createBorrow = async (req, res, next) => {
	try {
		const { id } = req.body;
		const borrow = new Borrow({
			id: id,
			user: req.user.id,
		});
		await borrow.save();
		res.status(201).json(borrow);
	} catch (error) {
		next(error);
	}
};

// Get all users
const getUsers = async (req, res, next) => {
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};

// Get a user by ID
const getUserById = async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

// Update a user by ID
const updateUser = async (req, res, next) => {
	try {
		const user = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
};

// Delete a user by ID
const deleteUser = async (req, res, next) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json({ message: "User deleted" });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	createUser,
	getUsers,
	getUserById,
	updateUser,
	deleteUser,
};

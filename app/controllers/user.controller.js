const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateJWTtoken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "14d" });
};

// Create a new user
const createUser = async (req, res, next) => {
	try {
		const {
			firstName,
			lastName,
			birthdate,
			address,
			phone,
			password,
			roles = "user",
		} = req.body;

		if (!phone || !password || !firstName || !lastName) {
			return res.status(400).json({
				message:
					"Please provide 'phone', 'password', first and last name.",
			});
		}
		const userExists = await User.findOne({ phone });
		if (userExists) {
			return res.status(400).json({ message: "User already exists." });
		}
		const user = await User.create(req.body);
		if (user) {
			res.status(201).json({
				user: user,
				token: generateJWTtoken(user.id),
				message: "Register successful,",
			});
		} else {
			throw new Error("Invalid user data.");
		}
	} catch (error) {
		next(error);
	}
};

const loginUser = async (req, res, next) => {
	try {
		const { phone, password } = req.body;
		if (!phone || !password) {
			return res.status(400).json({
				message: "phone and password are required.",
			});
		}
		const user = await User.findOne({ phone });
		if (!user) {
			return res
				.status(401)
				.json({ message: "Invalid email or password" });
		}
		const isMatch = password === user.password;
		if (!isMatch) {
			return res
				.status(401)
				.json({ message: "Invalid email or password" });
		}

		res.status(200).json({
			...user.toObject(),
			token: generateJWTtoken(user._id),
			message: "Login successful",
		});
	} catch (error) {
		next(error);
	}
};

// Get all users
const getUsers = async (req, res, next) => {
	try {
		const query = {};
		if (req.query.roles) {
			query.roles = { $in: req.query.roles.split(",") };
		}
		if (req.query.firstName) {
			query.firstName = req.query.firstName;
		}
		if (req.query.lastName) {
			query.lastName = req.query.lastName;
		}

		const users = await User.find(query);
		res.status(200).json(users);
	} catch (error) {
		next(error);
	}
};

const getCurrentUser = async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id);
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json({ ...user.toObject() });
	} catch (error) {
		next(error);
	}
};

// Get a user by ID
const getUserById = async (req, res, next) => {
	try {
		const user = await User.findById(req.query);
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
	loginUser,
	getUsers,
	getCurrentUser,
	getUserById,
	updateUser,
	deleteUser,
};

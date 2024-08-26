const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	firstName: {
		type: String,
		required: [true, "Please enter the first name"],
	},
	lastName: {
		type: String,
		required: [true, "Please enter the last name"],
	},
	roles: {
		type: String, // "user", "staff"
		required: [true, "Please enter the role"],
	},
	birthdate: {
		type: Date,
		required: false,
	},
	address: {
		type: String,
		required: false,
	},
	phone: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Please enter the password"],
	},
});

const User = mongoose.model("User", userSchema);
module.exports = User;

const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter the first name"],
	},
	country: {
		type: String,
		required: false,
	},
	birthdate: {
		type: Date,
		required: false,
	},
	gender: {
		type: Boolean, // Male: true, female: false
		required: false,
	},
});

const Author = mongoose.model("Author", authorSchema);
module.exports = Author;

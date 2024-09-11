const mongoose = require("mongoose");

const borrowSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: [true, "Please enter the name of this user"],
	},
	book: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Book",
		required: [true, "Please enter the title of the book"],
	},
	// the day the user borrows the book
	borrowDate: {
		type: Date,
		required: [true, "Please enter the borrow date"],
	},
	// the day the user is expected to return the book
	dueDate: {
		type: Date,
		required: [true, "Please enter the due date"],
	},
	// the day the user actually returns the book
	returnDate: {
		type: Date,
		required: false,
	},
	// whether the user has returned the book or not
	isReturned: {
		type: Boolean,
		required: true,
	},
	// notes about this borrow
	note: {
		type: String,
		required: false,
	},
});

const Borrow = mongoose.model("Borrow", borrowSchema);
module.exports = Borrow;

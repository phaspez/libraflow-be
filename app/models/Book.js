const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
	title: {
		type: String,
		required: [true, "Please enter the title of the book"],
	},
	description: {
		type: String,
		required: false,
	},
	inLibrary: {
		type: Number,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category",
		required: false,
	},
	pageCount: {
		type: Number,
		required: true,
	},
	publishYear: {
		type: Date,
		required: false,
	},
	publisher: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Publisher",
		required: false,
	},
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;

const mongoose = require("mongoose");

const wishlistSchema = mongoose.Schema({
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
});

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
module.exports = Wishlist;

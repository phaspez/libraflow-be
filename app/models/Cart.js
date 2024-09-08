const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: [true, "Please specify the user associated with the cart"],
	},
	book: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Book",
		required: [true, "Please specify the book being added to the cart"],
	},
	quantity: {
		type: Number,
		required: true,
		min: [1, "Quantity must be at least 1"],
	},
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;

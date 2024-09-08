const Cart = require("../models/Cart"); // Assuming your Cart model is in the models directory

// Get cart items for a specific user
const getCartItems = async (req, res) => {
	try {
		const cartItems = await Cart.find({ user: req.params.userId })
			.populate("book") // Populates the book details if needed
			.exec();

		if (!cartItems.length) {
			return res
				.status(404)
				.json({ message: "No items found in the cart" });
		}

		const totalBooksCount = cartItems.reduce(
			(acc, item) => acc + item.quantity,
			0,
		);

		res.status(200).json({ items: cartItems, count: totalBooksCount });
	} catch (error) {
		res.status(500).json({
			message: "Failed to retrieve cart items",
			error: error.message,
		});
	}
};

// Update an item in the cart
const updateCartItem = async (req, res) => {
	const { userId, cartItemId } = req.params;
	const { quantity } = req.body;

	try {
		// Find the specific cart item by ID and ensure it belongs to the user
		const cartItem = await Cart.findOne({ _id: cartItemId, user: userId });

		if (!cartItem) {
			return res.status(404).json({ message: "Cart item not found" });
		}

		// Update the cart item quantity
		if (quantity !== undefined) {
			cartItem.quantity = quantity;
		}

		await cartItem.save();
		res.status(200).json({
			message: "Cart item updated successfully",
			cartItem,
		});
	} catch (error) {
		res.status(500).json({
			message: "Failed to update cart item",
			error: error.message,
		});
	}
};

// Remove an item from the cart
const removeCartItem = async (req, res) => {
	const { userId, cartItemId } = req.params;

	try {
		// Find and delete the cart item by ID, ensuring it belongs to the user
		const cartItem = await Cart.findOneAndDelete({
			_id: cartItemId,
			user: userId,
		});

		if (!cartItem) {
			return res.status(404).json({ message: "Cart item not found" });
		}

		res.status(200).json({ message: "Cart item removed successfully" });
	} catch (error) {
		res.status(500).json({
			message: "Failed to remove cart item",
			error: error.message,
		});
	}
};

module.exports = { getCartItems, updateCartItem, removeCartItem };

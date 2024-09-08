const express = require("express");
const {
	getCartItems,
	updateCartItem,
	removeCartItem,
} = require("../controllers/cart.controller");
const router = express.Router();

// Get cart items for a user
router.get("/:userId", getCartItems);

// Update a cart item for a user
router.put("/:userId/:cartItemId", updateCartItem);
router.delete("/:userId/:cartItemId", removeCartItem);

module.exports = router;

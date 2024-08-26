const express = require("express");
const router = express.Router();
const {
	createCategory,
	deleteCategory,
	getCategories,
	getCategoryById,
	updateCategory,
} = require("../controllers/category.controller");
const { protect, authorize } = require("../middleware/auth.middleware");

router.get("/", getCategories);

/*
{
    name: String,
    description: String
}
 */
router.post("/", protect, authorize("staff", "admin"), createCategory);

router.get("/:id", getCategoryById);

router.delete("/:id", protect, authorize("staff", "admin"), deleteCategory);

router.patch("/:id", protect, authorize("staff", "admin"), updateCategory);

module.exports = router;

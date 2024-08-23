const express = require('express');
const router = express.Router();
const { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } = require("../controllers/category.controller");

router.get('/', getCategories);

/*
{
    name: String,
    description: String
}
 */
router.post('/', createCategory);

router.get("/:id", getCategoryById);

router.delete("/:id", deleteCategory);

router.patch("/:id", updateCategory);

module.exports = router;

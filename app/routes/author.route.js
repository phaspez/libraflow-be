const express = require("express");
const router = express.Router();
const {
	createAuthor,
	deleteAuthor,
	getAuthorById,
	getAuthors,
	getBooksByAuthor,
	updateAuthor,
} = require("../controllers/author.controller");
const { authorize, protect } = require("../middleware/auth.middleware");

router.get("/", getAuthors);

/*
{
    name: String,
    description: String
}
 */
router.post("/", protect, authorize("staff", "admin"), createAuthor);

router.post("/:id/books", getBooksByAuthor);

router.get("/:id", getAuthorById);

router.delete("/:id", protect, authorize("staff", "admin"), deleteAuthor);

router.patch("/:id", protect, authorize("staff", "admin"), updateAuthor);

module.exports = router;

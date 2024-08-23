const express = require("express");
const router = express.Router();
const {
	deleteBook,
	createBook,
	getBookByID,
	updateBook,
	getBooks,
} = require("../controllers/book.controller");

router.get("/", getBooks);

/*
{
    name: String,
    description: String
}
 */
router.post("/", createBook);

router.get("/:id", getBookByID);

router.delete("/:id", deleteBook);

router.patch("/:id", updateBook);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
	deleteBook,
	createBook,
	getBookByID,
	updateBook,
	getBooks,
} = require("../controllers/book.controller");
const { authorize, protect } = require("../middleware/auth.middleware");

router.get("/", getBooks);

/*
{
    name: String,
    description: String
}
 */
router.post("/", protect, authorize("staff", "admin"), createBook);

router.get("/:id", getBookByID);

router.delete("/:id", protect, authorize("staff", "admin"), deleteBook);

router.patch("/:id", protect, authorize("staff", "admin"), updateBook);

module.exports = router;

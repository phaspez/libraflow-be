const express = require("express");
const router = express.Router();
const {
	createPublisher,
	deletePublisher,
	getPublisherById,
	getPublishers,
	updatePublisher,
	getAuthorsByPublisher,
	getBooksByPublisher,
} = require("../controllers/publisher.controller");
const { protect, authorize } = require("../middleware/auth.middleware");

router.get("/", getPublishers);

router.post("/", protect, authorize("staff", "admin"), createPublisher);

router.get("/:id", getPublisherById);

router.delete("/:id", protect, authorize("staff", "admin"), deletePublisher);
router.patch("/:id", protect, authorize("staff", "admin"), updatePublisher);
router.get("/:id/books", getBooksByPublisher);
router.get("/:id/authors", getAuthorsByPublisher);

module.exports = router;

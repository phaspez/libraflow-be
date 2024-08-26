const express = require("express");
const router = express.Router();
const {
	getAllImages,
	getImage,
	uploadImage,
	deleteImage,
	upload,
} = require("../middleware/upload.middleware");
const { protect, authorize } = require("../middleware/auth.middleware");

router.get("/", getAllImages);
router.get("/:filename", getImage);
// form-data, coverImage
router.post("/", upload, protect, authorize("staff", "admin"), uploadImage);
router.delete("/:filename", protect, authorize("staff", "admin"), deleteImage);

module.exports = router;

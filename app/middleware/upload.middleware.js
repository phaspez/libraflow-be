const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Set up storage engine
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		const uploadPath = "uploads/";
		// Ensure the directory exists
		fs.mkdirSync(uploadPath, { recursive: true });
		cb(null, uploadPath);
	},
	filename: function (req, file, cb) {
		// Use the original name + a timestamp to avoid conflicts
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

// Initialize multer with storage options
const upload = multer({
	storage: storage,
	limits: { fileSize: 1000000 }, // 1MB limit
	fileFilter: (req, file, cb) => {
		const filetypes = /jpeg|jpg|png/;
		const extname = filetypes.test(
			path.extname(file.originalname).toLowerCase(),
		);
		const mimetype = filetypes.test(file.mimetype);

		if (mimetype && extname) {
			return cb(null, true);
		} else {
			cb("Error: Images Only!");
		}
	},
}).single("coverImage");

const uploadImage = (req, res, next) => {
	if (!req.file) {
		return res.status(400).json({ message: "Please upload a file" });
	}
	const fileUrl = `${req.protocol}://${req.get("host")}/api/upload/${req.file.filename}`;

	// Respond with the file URL
	res.status(200).send({ fileUrl });
};

const getImage = (req, res, next) => {
	try {
		const filename = req.params.filename;
		// file is currently in routes, so to go to uploads folder, i used .. twice.
		const filepath = path.join(__dirname, "..", "..", "uploads", filename);
		console.log(filepath);
		// Check if the file exists
		if (fs.existsSync(filepath)) {
			res.sendFile(filepath);
		} else {
			res.status(404).send("File not found.");
		}
	} catch (error) {
		next(error);
	}
};

// fetch all images in the uploads directory
const getAllImages = (req, res, next) => {
	try {
		const uploadPath = path.join(__dirname, "../../uploads");

		fs.readdir(uploadPath, (err, files) => {
			if (err) {
				return next(err);
			}

			const imageFiles = files.filter((file) =>
				/\.(jpeg|jpg|png)$/.test(file),
			);
			const imageUrls = imageFiles.map(
				(file) =>
					`${req.protocol}://${req.get("host")}/api/upload/${file}`,
			);

			res.status(200).json(imageUrls);
		});
	} catch (error) {
		next(error);
	}
};

const deleteImage = (req, res, next) => {
	try {
		const filename = req.params.filename;
		const filepath = path.join(__dirname, "../../uploads", filename);

		fs.unlink(filepath, (err) => {
			if (err) {
				if (err.code === "ENOENT") {
					return res.status(404).json({ message: "File not found." });
				}
				return next(err);
			}

			res.status(200).json({ message: "File deleted successfully." });
		});
	} catch (e) {
		next(e);
	}
};

module.exports = { upload, uploadImage, getImage, getAllImages, deleteImage };

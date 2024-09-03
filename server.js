const express = require("express");
const cors = require("cors");
const MongoDB = require("./app/utils/mongodb.util");
const config = require("./app/config/index");
const dotenv = require("dotenv").config();
const connectDB = require("./app/utils/mongoose");
const errorMiddleware = require("./app/middleware/error.middleware");
const {
	getImage,
	uploadImage,
	upload,
} = require("./app/middleware/upload.middleware");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
const logger = require("morgan");

connectDB();

const corsOptions = {
	// allow all ports from localhost
	origin: function (origin, callback) {
		const localhostRegex = /^http:\/\/localhost:\d+$/;
		if (localhostRegex.test(origin) || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger("dev"));

app.use("/api/category", require("./app/routes/category.route"));
app.use("/api/publisher", require("./app/routes/publisher.route"));
app.use("/api/user", require("./app/routes/user.route"));
app.use("/api/book", require("./app/routes/book.route"));
app.use("/api/author", require("./app/routes/author.route"));

app.use("/api/admin/dashboard", require("./app/routes/dashboard.route"));

app.use(errorMiddleware);

app.get("/", (req, res) => {
	res.json({ message: "Welcome to LibraFlow book management application." });
});

//app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/upload", require("./app/routes/image.route"));

async function startServer() {
	try {
		await MongoDB.connect(config.db.uri);
		console.log("Connected to the database");

		const PORT = config.app.port;

		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (error) {
		console.log("Cannot connect to the database!", error);
		process.exit();
	}
}

startServer();

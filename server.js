const express = require("express");
const cors = require("cors");
const MongoDB = require("./app/utils/mongodb.util");
const config = require("./app/config/index");
const connectDB = require("./app/utils/mongoose");
//const contactsRouter = require("./app/routes/contact.route");
const errorMiddleware = require("./app/middleware/error.middleware");

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/category", require("./app/routes/category.route"));
app.use("/api/publisher", require("./app/routes/publisher.route"));
app.use("/api/user", require("./app/routes/user.route"));
app.use("/api/book", require("./app/routes/book.route"));

app.use(errorMiddleware);

app.get("/", (req, res) => {
	res.json({ message: "Welcome to LibraFlow book management application." });
});

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

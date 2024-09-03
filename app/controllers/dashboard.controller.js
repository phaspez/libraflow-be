const Book = require("../models/Book");
const User = require("../models/User");
const Author = require("../models/Author");
const Publisher = require("../models/Publisher");
const Borrow = require("../models/Borrow");

const getDashboardStats = async (req, res, next) => {
	try {
		const [bookCount, userCount, authorCount, publisherCount, borrowCount] =
			await Promise.all([
				Book.countDocuments(),
				User.countDocuments(),
				Author.countDocuments(),
				Publisher.countDocuments(),
				Borrow.countDocuments(),
			]);

		res.status(200).json({
			bookCount,
			userCount,
			authorCount,
			publisherCount,
			borrowCount,
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getDashboardStats,
};

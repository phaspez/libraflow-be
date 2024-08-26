const Book = require("../models/Book");
const { upload } = require("../middleware/upload.middleware");

const createBook = async (req, res, next) => {
	upload(req, res, async (err) => {
		if (err) {
			return res.status(400).json({ message: err });
		}

		try {
			const bookData = {
				...req.body,
				coverImageUrl: req.file
					? `/uploads/${req.file.filename}`
					: null,
			};
			const book = new Book(bookData);
			await book.save();
			res.status(201).json(book);
		} catch (error) {
			next(error);
		}
	});
};

// get all books in the library, can filters with params
// params:
// page: number -> pagination (default: 1)
//
// limit: number -> number of books to return (default: 10)
//
// category: string -> category of the book
//
// publisher: string -> publisher of the book
//
// year: number -> year of publication
//
// title: string -> title of the book
//
// example: ?limit=20&category=<id>&publisher=<id>&year=2021&title=hello
const getBooks = async (req, res, next) => {
	const { page = 1, limit = 10 } = req.query;
	const query = {};
	if (req.query.category) {
		query.category = { $in: req.query.category.split(",") };
	}
	if (req.query.publisher) {
		query.publisher = req.query.publisher;
	}
	if (req.query.year) {
		query.year = req.query.year;
	}
	if (req.query.title) {
		query.title = { $regex: req.query.title, $options: "i" };
	}

	try {
		const books = await Book.find(query)
			.skip((page - 1) * limit)
			.limit(parseInt(limit))
			.populate("category")
			.populate("publisher")
			.populate("author");

		const booksWithPopulatedFields = books.map((book) => ({
			...book.toObject(),
			category: book.category,
			publisher: book.publisher,
			author: book.author,
		}));
		const totalBooks = await Book.countDocuments(query);

		res.status(200).json({
			books: booksWithPopulatedFields,
			currentPage: parseInt(page),
			totalPages: Math.ceil(totalBooks / limit),
			totalBooks: totalBooks,
		});
	} catch (error) {
		next(error);
	}
};

const getBookByID = async (req, res, next) => {
	try {
		const book = await Book.findById(req.params.id)
			.populate("category")
			.populate("publisher")
			.populate("author");
		if (!book) {
			return res.status(404).json({ message: "Book not found" });
		}
		res.status(200).json({
			...book.toObject(),
			category: book.category,
			publisher: book.publisher,
			author: book.author,
		});
	} catch (error) {
		next(error);
	}
};

const updateBook = async (req, res, next) => {
	try {
		const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!book) {
			return res.status(404).json({ message: "Book not found" });
		}
		res.status(200).json(book);
	} catch (error) {
		next(error);
	}
};

const deleteBook = async (req, res, next) => {
	try {
		const book = await Book.findByIdAndDelete(req.params.id);
		if (!book) {
			return res.status(404).json({ message: "Book not found" });
		}
		res.status(200).json({ message: "Book deleted" });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	createBook,
	getBooks,
	getBookByID,
	updateBook,
	deleteBook,
};

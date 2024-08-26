const Author = require("../models/Author");
const Book = require("../models/Book");

// Create a new author
const createAuthor = async (req, res, next) => {
	try {
		const author = new Author(req.body);
		await author.save();
		res.status(201).json(author);
	} catch (error) {
		next(error);
	}
};

// Get all authors
const getAuthors = async (req, res, next) => {
	try {
		const authors = await Author.find();
		res.status(200).json(authors);
	} catch (error) {
		next(error);
	}
};

// Get an author by ID
const getAuthorById = async (req, res, next) => {
	try {
		const author = await Author.findById(req.params.id);
		if (!author) {
			return res.status(404).json({ message: "Author not found" });
		}
		res.status(200).json(author);
	} catch (error) {
		next(error);
	}
};

// Update an author by ID
const updateAuthor = async (req, res, next) => {
	try {
		const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!author) {
			return res.status(404).json({ message: "Author not found" });
		}
		res.status(200).json(author);
	} catch (error) {
		next(error);
	}
};

// Delete an author by ID
const deleteAuthor = async (req, res, next) => {
	try {
		const author = await Author.findByIdAndDelete(req.params.id);
		if (!author) {
			return res.status(404).json({ message: "Author not found" });
		}
		res.status(200).json({ message: "Author deleted" });
	} catch (error) {
		next(error);
	}
};

// Get books by a specific author
const getBooksByAuthor = async (req, res, next) => {
	try {
		const books = await Book.find({ author: req.params.authorId }).populate(
			"author",
		);
		if (!books.length) {
			return res
				.status(404)
				.json({ message: "No books found for this author" });
		}
		res.status(200).json(books);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	createAuthor,
	getAuthors,
	getAuthorById,
	updateAuthor,
	deleteAuthor,
	getBooksByAuthor,
};

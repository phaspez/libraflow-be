//const User = require("../models/User");
const Borrow = require("../models/Borrow");
const User = require("../models/User");
const Book = require("../models/Book");

const createBorrow = async (req, res, next) => {
	try {
		const book = await Book.findById(req.body.bookId);
		if (!book) {
			return res.status(400).json({ message: "Book not found" });
		}
		if (book.inLibrary <= 0) {
			return res.status(400).json({ message: "Book is not available" });
		}

		const currentDate = new Date();
		const futureDate = new Date(currentDate);
		futureDate.setDate(currentDate.getDate() + 14);
		const borrow = new Borrow({
			user: req.user.id,
			book: req.body.bookId,
			borrowDate: currentDate,
			dueDate: futureDate,
			isReturned: false,
		});
		await borrow.save();
		book.inLibrary -= 1;
		await book.save();

		res.status(201).json(borrow);
	} catch (error) {
		next(error);
	}
};

// Get all borrow records
const getAllBorrows = async (req, res, next) => {
	try {
		const borrows = await Borrow.find().populate("user").populate("book");
		res.status(200).json(borrows);
	} catch (error) {
		next(error);
	}
};

// Get borrow records by user ID
const getBorrowsByUserId = async (req, res, next) => {
	try {
		const borrows = await Borrow.find({ user: req.params.userId })
			.populate("user")
			.populate("book");
		res.status(200).json(borrows);
	} catch (error) {
		next(error);
	}
};

const getCurrentUserBorrow = async (req, res, next) => {
	console.log("testing");
	console.log(req.user);
	try {
		const borrows = await Borrow.find({ user: req.user.id })
			.populate("user")
			.populate("book");
		console.log(borrows);
		res.status(200).json(borrows);
	} catch (error) {
		next(error);
	}
};

const updateBorrow = async (req, res, next) => {
	try {
		const borrow = await Borrow.findById(req.params.id);
		if (!borrow) {
			return res.status(404).json({ message: "Borrow record not found" });
		}

		const book = await Book.findById(borrow.book);
		if (!book) {
			return res.status(404).json({ message: "Book not found" });
		}

		const wasReturned = borrow.isReturned;
		const willBeReturned = req.body.isReturned;

		// Update the borrow record
		Object.assign(borrow, req.body);
		await borrow.save();

		// Update the book's inLibrary count if the return status has changed
		if (!wasReturned && willBeReturned) {
			book.inLibrary += 1;
			await book.save();
		} else if (wasReturned && !willBeReturned) {
			if (book.inLibrary <= 0) {
				return res.status(400).json({
					message:
						"Cannot un-return book: no copies available in library",
				});
			}
			book.inLibrary -= 1;
			await book.save();
		}

		res.status(200).json(borrow);
	} catch (error) {
		next(error);
	}
};

// Delete a borrow record by ID
const deleteBorrow = async (req, res, next) => {
	try {
		const borrow = await Borrow.findByIdAndDelete(req.params.id);
		if (!borrow) {
			return res.status(404).json({ message: "Borrow record not found" });
		}
		res.status(200).json({ message: "Borrow record deleted" });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	createBorrow,
	getCurrentUserBorrow,
	getAllBorrows,
	getBorrowsByUserId,
	deleteBorrow,
	updateBorrow,
};

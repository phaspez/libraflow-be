const Publisher = require('../models/Publisher');

// Create a new publisher
const createPublisher = async (req, res, next) => {
    try {
        const publisher = new Publisher(req.body);
        await publisher.save();
        res.status(201).json(publisher);
    } catch (error) {
        next(error);
    }
};

// Get all publishers
const getPublishers = async (req, res, next) => {
    try {
        const publishers = await Publisher.find();
        res.status(200).json(publishers);
    } catch (error) {
        next(error);
    }
};

// Get a publisher by ID
const getPublisherById = async (req, res, next) => {
    try {
        const publisher = await Publisher.findById(req.params.id);
        if (!publisher) {
            return res.status(404).json({ message: 'Publisher not found' });
        }
        res.status(200).json(publisher);
    } catch (error) {
       next(error);
    }
};

// Update a publisher by ID
const updatePublisher = async (req, res, next) => {
    try {
        const publisher = await Publisher.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!publisher) {
            return res.status(404).json({ message: 'Publisher not found' });
        }
        res.status(200).json(publisher);
    } catch (error) {
        next(error);
    }
};

// Delete a publisher by ID
const deletePublisher = async (req, res, next) => {
    try {
        const publisher = await Publisher.findByIdAndDelete(req.params.id);
        if (!publisher) {
            return res.status(404).json({ message: 'Publisher not found' });
        }
        res.status(200).json({ message: 'Publisher deleted' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createPublisher,
    getPublishers,
    getPublisherById,
    updatePublisher,
    deletePublisher
};
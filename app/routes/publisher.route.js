const express = require('express');
const router = express.Router();
const {createPublisher, deletePublisher, getPublisherById, getPublishers, updatePublisher} = require("../controllers/publisher.controller");

router.get('/', getPublishers);

router.post('/', createPublisher);

router.get("/:id", getPublisherById);

router.delete("/:id", deletePublisher);

router.patch("/:id", updatePublisher);

module.exports = router;

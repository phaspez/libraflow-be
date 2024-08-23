const mongoose = require("mongoose");

const publisherSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter the name of this publisher"],
	},
	address: {
		type: String,
		required: false,
	},
});

const Publisher = mongoose.model("Publisher", publisherSchema);
module.exports = Publisher;

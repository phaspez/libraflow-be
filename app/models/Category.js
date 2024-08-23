const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Please enter book category'],
    },
    description: {
        type: String,
        required: false,
    },
})

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
const mongoose = require('mongoose');
const config = require("../config/index");

const connectDB = async() => {
    try {
        const connect = await mongoose.connect(config.db.uri);
        console.log(`MongoDB connected: ${connect.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;

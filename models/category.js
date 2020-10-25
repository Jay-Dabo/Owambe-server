const mongoose = require('mongoose'); // Require Mongooge for connection to Database
const Schema = mongoose.Schema // Require Schema Instace of Mongoose

// Create Schema for Category in MongoDb
const categorySchema = new Schema({
    _id: { type: String },
    name: { type: String, unique: true, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('category', categorySchema, 'Categories')
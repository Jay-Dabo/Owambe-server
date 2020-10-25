const cryptoRandomString = require('crypto-random-string'); // Use Cryptographic Random String or ID Generation
const mongoose = require('mongoose'); // Require Mongooge for connection to Database
const Schema = mongoose.Schema // Require Schema Instace of Mongoose

// Create Schema for Fundraiser in MongoDb
const fundraiserSchema = new Schema({
    _id: { type: String, default: cryptoRandomString({ length: 10, type: 'numeric' }) },
    title: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    categories: [{ type: Schema.Types.String, ref: 'category', required: true }],
    amount: { type: Number, required: true },
    is_active: { type: Boolean, default: false }
},
{
	timestamps: true
});

module.exports = mongoose.model('fundraiser', fundraiserSchema, 'Fundraisers')
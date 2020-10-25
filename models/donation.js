const mongoose = require('mongoose'); // Require Mongooge for connection to Database
const Schema = mongoose.Schema // Require Schema Instace of Mongoose

// Create Schema for Donation in MongoDb
const donationSchema = new Schema({
	fundraiser: { type: Schema.Types.String, ref: 'fundraiser', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    organization: { type: Schema.Types.ObjectId, ref: 'organization' },
    amount: { type: Number, required: true }
},
{
	timestamps: true
});

module.exports = mongoose.model('donation', donationSchema, 'Donations')
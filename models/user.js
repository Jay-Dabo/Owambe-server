const firearch = require('firearch');
const Schema = firearch.Schema;

const userSchema = new Schema({
  	first_name: { type: String, required: true },
    other_names: { type: String },
    last_name: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, lowercase: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/], unique: true, required: true },
    phone_number: { type: Number, required: true },
    birth_date: { type: Date, format: 'YYYY-mm-dd', required: true },
    address: { type: String, required: true },
    password: { type: String, min: [8, 'Too short, min 4 characters are required'], required: true },
    password_confirmation: { type: String, min: [8, 'Too short, min 4 characters are required'], required: true },
},
{ 
    timestamps: true 
});

// Export Model with the User schema into User Collection on Firestore
module.exports = firearch.model('user', userSchema, 'Users');
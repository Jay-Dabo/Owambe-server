const mongoose = require('mongoose'); // Require Mongooge for connection to Database
const Schema = mongoose.Schema // Require Schema Instace of Mongoose
const bcrypt = require('bcryptjs'); // Require BCrypt for Password encryption

// Create Schema for Users in MongoDb
const userSchema = new Schema({
    first_name: { type: String, required: true },
    other_names: { type: String },
    last_name: { type: String, required: true },
    gender: { type: String },
    email: { type: String, lowercase: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/], unique: true, required: true },
    phone_number: { type: Number, required: true },
    birth_date: { type: Date, format: 'YYYY-mm-dd' },
    country: { type: String, required: true },
    account_balance: { type: Number, default: 100000 },
    is_active: { type: Boolean, default: false },
    user_type: { type: String, default: 'Individual' },
    password: { type: String, min: [8, 'Too short, min 4 characters are required'], required: true },
    password_confirmation: { type: String, min: [8, 'Too short, min 4 characters are required'], required: true },
},
{ 
    timestamps: true 
});

userSchema.pre('save', function(next) {
    const user = this
    bcrypt.genSalt(15, function(error, salt) {
        if (error) {
            return res.status(422).send('There is an error while generatiing salt hash')
        }
        bcrypt.hash(user.password, salt, function(error, hash) {
            if (error) {
                return res.status(422).send('There is an error with password hashing')
            }
            // Replace Password field values with hashed password
            user.password = hash
            user.password_confirmation = hash
            next()
        });
    });
});

userSchema.methods.hasSamePassword = function(password) {
    return bcrypt.compareSync(password, this.password)
};

// Export Model with the User schema into User Collection on MongoDb
module.exports = mongoose.model('user', userSchema, 'Users');
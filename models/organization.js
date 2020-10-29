const mongoose = require('mongoose'); // Require Mongooge for connection to Database
const Schema = mongoose.Schema // Require Schema Instace of Mongoose
const bcrypt = require('bcryptjs'); // Require BCrypt for Password encryption

// Create Schema for Organizations in MongoDb
const organizationSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, lowercase: true, match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/], unique: true, required: true },
    phone_number: { type: Number, required: true },
    address: { type: String, required: true },
    post_office_address: { type: String },
    account_balance: { type: Number, default: 200000 },
    is_active: { type: Boolean, default: false },
    user_type: { type: String, default: 'Organization' },
    password: { type: String, min: [8, 'Too short, min 4 characters are required'], required: true },
    password_confirmation: { type: String, min: [8, 'Too short, min 4 characters are required'], required: true },
},
{ 
    timestamps: true 
});

organizationSchema.pre('save', function(next) {
    const organization = this
    bcrypt.genSalt(15, function(error, salt) {
        if (error) {
            return res.status(422).send('There is an error while generatiing salt hash')
        }
        bcrypt.hash(organization.password, salt, function(error, hash) {
            if (error) {
                return res.status(422).send('There is an error with password hashing')
            }
            // Replace Password field values with hashed password
            organization.password = hash
            organization.password_confirmation = hash
            next()
        });
    });
});

organizationSchema.methods.hasSamePassword = function(password) {
    return bcrypt.compareSync(password, this.password)
};

// Export Model with the Organization schema into Organization Collection on MongoDb
module.exports = mongoose.model('organization', organizationSchema, 'Organizations');
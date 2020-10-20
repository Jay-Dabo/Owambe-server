const config = require('../config.json');
const jwt = require('jsonwebtoken'); // Use JSON Web Token for Authentications

// Model Imports
const User = require('../models/user');



// API Routing Functions
exports.all = function(req, res) {
    User.find(function(error, users) {
        if (error) {
            return res.status(422).send('Sorry!! Your request could not be processed at the moment, please try again')
        } else {
            return res.json(users);
        }
    });
}

exports.update = function(req, res) {
    let userData = req.body

    User.findByIdAndUpdate(req.params._id, { $set: userData }, function(error, user) {
        if (error) {
            return res.status(422).send('Oops! Something went wrong with your update request')
        } else {
            return res.status(200).send(user)
        }
    });
}

exports.register = function(req, res) {
    let userData = req.body

    // Presence Verification
    if (!userData.first_name) {
        return res.status(422).send('Please provide your First Name')
    }
    if (!userData.last_name) {
        return res.status(422).send('Please provide your Last Name')
    }
    if (!userData.email) {
        return res.status(422).send('Please provide your Email Address')
    }
    if (!userData.phone_number) {
        return res.status(422).send('Please provide your Phone Number')
    }
    if (!userData.gender) {
        return res.status(422).send('Please select your Gender')
    }
    if (!userData.birth_date) {
        return res.status(422).send('Please provide your Date of Birth')
    }
    if (!userData.address) {
        return res.status(422).send('Please provide your Residential Address')
    }
    if (!userData.password) {
        return res.status(422).send('Please provide your Password')
    }

    // Password Verification
    if (userData.password != userData.password_confirmation) {
        return res.status(422).json('Password & Password Confirmation do not match')
    }

    // Registered User Check
    User.findOne({ email: userData.email }, function(error, registeredUser) {
        if (error) {
            return res.status(422).send('Oops! Something went wrong with your registration')
        }

        if (registeredUser) {
            return res.status(422).send('Sorry!! A User with this bio-data already exists.')
        } else {
            let user = new User(userData)
            user.save((error, registeredUser) => {
                if (error) {
                    console.log(error)
                } else {
                    let payload = { subject: registeredUser._id }
                    let token = jwt.sign(payload, config.secretKey, { expiresIn: "1d" })
                    res.status(200).send({ token })
                }
            });
        }
    });
}
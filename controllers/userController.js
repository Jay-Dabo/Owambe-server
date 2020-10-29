const cryptoRandomString = require('crypto-random-string'); // Use Cryptographic Random String for Secret Key generation
const jwt = require('jsonwebtoken'); // Use JSON Web Token for Authentications
const nodemailer = require('nodemailer'); // Use Nodemailer for delivering messages between different email hosts as a protocol
const smtpTransport = require('nodemailer-smtp-transport'); // SMTP transport module for Nodemailer

const secretKey = cryptoRandomString({ length: 106, type: 'alphanumeric' });

const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'owambe.server@gmail.com',
        pass: 'server.owambe'
    }
}));

// Model Imports
const User = require('../models/user');



// API Routing Functions
exports.all = function(req, res) {
    User.find(function(error, users) {
        if (error) {
            return res.status(422).send('Sorry!! Your request could not be processed at the moment, please try again')
        } else {
            return res.json(users)
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

exports.one = function(req, res) {
    User.findById(req.params._id, function(error, user) {
            if (error) {
                return res.status(404).send('Sorry!! The queried User could not be found or does not exist in our database')
            } else {
                return res.status(200).json(user)
            }
        }
    );
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
    if (!userData.country) {
        return res.status(422).send('Please provide your residential Country')
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
                    let to = registeredUser.email
                    let subject = 'OWAMBE - ACCOUNT NUMBER NOTIFICATION'
                    let message = "Welcome to Owambe. Your unique account number for all transactionary purposes is: " + registeredUser._id

                    const mailOptions = {
                        from: 'Owambe Service',
                        to: to,
                        subject: subject,
                        html: message
                    };

                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);  
                        } else {     
                            console.log('Email sent: ' + info.response);  
                        }   
                    });

                    let payload = { subject: registeredUser._id }
                    let token = jwt.sign(payload, secretKey, { expiresIn: "1d" })
                    res.status(200).send({ token })
                }
            });
        }
    });
}

exports.login = function(req, res) {
    let userData = req.body

    // Presence Verification
    if (!userData._id) {
        return res.status(422).send('Please provide your Account Number')
    }
    if (!userData.password) {
        return res.status(422).send('Please provide your Password')
    }


    User.findOne({ _id: userData._id }, (error, user) => {
        if (error) {
            return res.status(422).send('Oops! Something went wrong. Please try again.')
        }

        if (!user) {
            return res.status(401).send('Sorry!! You do not have an account with us. You should consider registering first.')
        }

        if (!user.hasSamePassword(userData.password)) {
            return res.status(401).send('Invalid Password')
        } else {
            let payload = { subject: user._id }
            let token = jwt.sign(payload, secretKey, { expiresIn: "1d" })
            res.status(200).send({ token })
        }
    });
}

exports.delete = function(req, res) {
    User.findByIdAndRemove(req.params._id, function(error, result) {
        if (error) {
            return res.status(422).send('Oops! Something went wrong with your delete request')
        } else {
            return res.status(200).send('You have successfully deleted this user')
        }
    });
}
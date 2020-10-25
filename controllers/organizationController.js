const cryptoRandomString = require('crypto-random-string'); // Use Cryptographic Random String for Secret Key generation
const jwt = require('jsonwebtoken'); // Use JSON Web Token for Authentications

const secretKey = cryptoRandomString({ length: 106, type: 'alphanumeric' });

// Model Imports
const Organization = require('../models/organization');



// API Routing Functions
exports.all = function(req, res) {
    Organization.find(function(error, organizations) {
        if (error) {
            return res.status(422).send('Sorry!! Your request could not be processed at the moment, please try again')
        } else {
            return res.json(organizations)
        }
    });
}

exports.update = function(req, res) {
    let organizationData = req.body

    Organization.findByIdAndUpdate(req.params._id, { $set: organizationData }, function(error, organization) {
        if (error) {
            return res.status(422).send('Oops! Something went wrong with your update request')
        } else {
            return res.status(200).send(organization)
        }
    });
}

exports.one = function(req, res) {
    Organization.findById(req.params._id, function(error, organization) {
            if (error) {
                return res.status(404).send('Sorry!! The queried Organization could not be found or does not exist in our database')
            } else {
                return res.status(200).json(organization)
            }
        }
    );
}

exports.register = function(req, res) {
    let organizationData = req.body

    // Presence Verification
    if (!organizationData.name) {
        return res.status(422).send('Please provide your First Name')
    }
    if (!organizationData.email) {
        return res.status(422).send('Please provide your Email Address')
    }
    if (!organizationData.phone_number) {
        return res.status(422).send('Please provide your Phone Number')
    }
    if (!organizationData.address) {
        return res.status(422).send('Please provide your Residential Address')
    }
    if (!organizationData.password) {
        return res.status(422).send('Please provide your Password')
    }

    // Password Verification
    if (organizationData.password != organizationData.password_confirmation) {
        return res.status(422).json('Password & Password Confirmation do not match')
    }

    // Registered Organization Check
    Organization.findOne({ email: organizationData.email }, function(error, registeredOrganization) {
        if (error) {
            return res.status(422).send('Oops! Something went wrong with your registration')
        }

        if (registeredOrganization) {
            return res.status(422).send('Sorry!! A Organization with this bio-data already exists.')
        } else {
            let organization = new Organization(organizationData)
            organization.save((error, registeredOrganization) => {
                if (error) {
                    console.log(error)
                } else {
                    let payload = { subject: registeredOrganization._id }
                    let token = jwt.sign(payload, secretKey, { expiresIn: "1d" })
                    res.status(200).send({ token })
                }
            });
        }
    });
}

exports.login = function(req, res) {
    let organizationData = req.body

    // Presence Verification
    if (!organizationData.email) {
        return res.status(422).send('Please provide your email address')
    }
    if (!organizationData.password) {
        return res.status(422).send('Please provide your Password')
    }


    Organization.findOne({ email: organizationData.email }, (error, organization) => {
        if (error) {
            return res.status(422).send('Oops! Something went wrong. Please try again.')
        }

        if (!organization) {
            return res.status(401).send('Sorry!! You do not have an account with us. You should consider registering first.')
        }

        if (!organization.hasSamePassword(organizationData.password)) {
            return res.status(401).send('Invalid Password')
        } else {
            let payload = { subject: organization._id }
            let token = jwt.sign(payload, secretKey, { expiresIn: "1d" })
            res.status(200).send({ token })
        }
    });
}

exports.delete = function(req, res) {
    Organization.findByIdAndRemove(req.params._id, function(error, result) {
        if (error) {
            return res.status(422).send('Oops! Something went wrong with your delete request')
        } else {
            return res.status(200).send('You have successfully deleted this organization')
        }
    });
}
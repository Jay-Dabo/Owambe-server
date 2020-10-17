const config = require('../config.js'); // Configuration File
const express = require('express'); // Require Express Server
const jwt = require('jsonwebtoken'); // Use JSON Web Token for Authentications
const router = express.Router(); // Require Routing for API endpints
const firearch  =  require('firearch'); // Require Firearch for Firestore object modeling

// Require Google Cloud Firestore API for connection to Database
const { Firestore } = require('@google-cloud/firestore');
const fstore = new Firestore({
    projectId: config.projectId,
    keyFilename: config.keyFilename
});

// Conect Google Cloud Firestore to the Database Instance
firearch.connect(fstore, error => {
	if (error) {
        console.log('Sorry!! There has been an error: ' + error)
    } else {
        console.log('Successfully connected to database!! Keep building!')
    }
}); 








module.exports = router
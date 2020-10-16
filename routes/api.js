const config = require('../config.js'); // Configuration File
const express = require('express'); // Require Express Server
const jwt = require('jsonwebtoken'); // Use JSON Web Token for Authentications
const router = express.Router(); // Require Routing for API endpints


// Require Google Cloud APIs for connection to Database
const { Firestore } = require('@google-cloud/firestore');
const { Gstore, instances } = require('gstore-node');

const gstore = new Gstore();
const fstore = new Firestore({
    projectId: config.projectId,
    keyFilename: config.keyFilename
});

// Conect Google Cloud Firestore to the Database Instance
gstore.connect(fstore);

// Save the gstore instance
instances.set('default', gstore);








module.exports = router
const express = require('express'); // Require Express Server
const jwt = require('jsonwebtoken'); // Use JSON Web Token for Authentications
const router = express.Router(); // Require Routing for API endpints

// Connect to Database in MongoDb
const db = "mongodb+srv://owambe-admin:kxygMXGuyPEV59x1@owambe.u03su.mongodb.net/Owambe?retryWrites=true&w=majority"
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, err => {
    if (err) {
        console.log('Sorry!! There has been an error: ' + err)
    } else {
        console.log('Successfully connected to database!!')
    }
});

module.exports = router
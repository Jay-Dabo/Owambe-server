const express = require('express'); // Require Express Server
const jwt = require('jsonwebtoken'); // Use JSON Web Token for Authentications
const router = express.Router(); // Require Routing for API endpints

// Require Mongooge for connection to Database
const mongoose = require('mongoose');

// Connect to Database in MongoDb
const db = "mongodb+srv://owambe-admin:sPDSmbVEakeozNBF@owambe.u03su.mongodb.net/Owambe?retryWrites=true&w=majority"
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false }, err => {
    if (err) {
        console.log('Sorry!! There has been an error: ' + err)
    } else {
        console.log('Successfully connected to database!! Keep building!!')
    }
});



// Import Controller files
const User = require('../controllers/userController');
const Category  = require('../controllers/categoryController')

// Routings for Users
router.get('/users', User.all);
router.get('/users/:_id', User.one);
router.post('/user/login', User.login);
router.patch('/users/:_id', User.update);
router.post('/user/register', User.register);

// Routes for Categories
router.get('/categories', Category.all)
router.post('/category/new', Category.add)
router.get('/categories/:_id', Category.one)
router.patch('/categories/:_id', Category.update)
router.delete('/categories/:_id', Category.delete)

module.exports = router
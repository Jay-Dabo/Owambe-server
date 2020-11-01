const express = require('express'); // Require Express Server
const jwt = require('jsonwebtoken'); // Use JSON Web Token for Authentications
const router = express.Router(); // Require Routing for API endpints

// Require Mongooge for connection to Database
const mongoose = require('mongoose');
const multer = require('multer');
const fs = require('fs')


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
const Category  = require('../controllers/categoryController');
const Organization = require('../controllers/organizationController');
const Fundraiser = require('../controllers/fundraiserController');
const Donation = require('../controllers/donationController');

// Root for openEducation API endpoints
router.get('/', (req, res) => {
    res.send('Owambe API route root')
});

// Routings for Users
router.get('/users', User.all);
router.get('/users/:_id', User.one);
router.post('/user/login', User.login);
router.patch('/users/:_id', User.update);
router.delete('/users/:_id', User.delete);
router.post('/user/register', User.register);

// Routes for Categories
router.get('/categories', Category.all);
router.post('/category/new', Category.add);
router.get('/categories/:_id', Category.one);
router.patch('/categories/:_id', Category.update);
router.delete('/categories/:_id', Category.delete);

// Routes for Fundraisers
router.get('/fundraisers', Fundraiser.all);
router.post('/fundraiser/new', Fundraiser.add);
router.get('/fundraisers/:_id', Fundraiser.one);
router.patch('/fundraisers/:_id', Fundraiser.update);
router.delete('/fundraisers/:_id', Fundraiser.delete);
router.get('/fundraiser/:categories', Fundraiser.common);

// Routes for Donations
router.get('/donations', Donation.all);
router.post('/donation/new', Donation.add);
router.get('/donations/:_id', Donation.one);
router.get('/donation/:fundraiser', Donation.common);

// Routings for Organizations
router.get('/organizations', Organization.all);
router.get('/organizations/:_id', Organization.one);
router.post('/organization/login', Organization.login);
router.patch('/organizations/:_id', Organization.update);
router.delete('/organizations/:_id', Organization.delete);
router.post('/organization/register', Organization.register);

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+ '.jpg')
    },
    fileFilter,
  })
   
  var upload = multer({ storage: storage })

// multer middleware

//multer filter
function fileFilter(req,file,cb){
    const allowedTypes = ["image/jpeg","image/png"];

    if(!allowedTypes.includes(file.mimetype)){
        error = new Error("Wrong file type");
        error.code= "INVALID_FILE_FORMAT"
       return cb(error,false)
    }
    cb(null,true)

}

// router.get('/uploadForm',function (req,res){
//     res.sendFile(__dirname + '/upload.html');
// })

router.post('/Upload',upload.single("myFile"),async (req,res,next)=>{
    
    try{

        const file = req.file
        if (!file) {
            const error = new Error('Please upload a file')
            error.httpStatusCode = 400
            return next(error)
        }
            res.send(file)
    }
    catch(err){
            // console.log(err);
            res.status(403).send(err)
            
    }


})

module.exports = router
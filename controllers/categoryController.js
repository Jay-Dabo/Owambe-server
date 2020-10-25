// Model Imports
const Category = require('../models/category')
const Fundraiser = require('../models/fundraiser')



exports.all = function(req, res) {
    Category.find(function(error, categories) {
        if (error) {
            return res.status(422).send('Sorry!! Your request could not be processed at the moment, please try again')
        } else {
            return res.status(200).json(categories)
        }
    });
}

exports.one = function(req, res) {
    Category.findById(req.params._id, function(error, category) {
            if (error) {
                return res.status(404).send('Sorry!! The queried category could not be found or does not exist in our database')
            } else {
                Fundraiser.find({ categories: req.params._id }, function(error, fundraisers) {
                    if (error) {
                        return res.status(422).send('Sorry no Fundraiser currently exists for this category')
                    } else {
                        return res.status(200).json(fundraisers)
                    }
                });
            }
        }
    );
}

exports.add = function(req, res) {
    let categoryData = req.body
    Category.findOne({ name: categoryData.name }, function(error, createdCategory) {
        if (error) {
            return res.status(422).send('Oops! Something went wrong with creating this Category.')
        }

        if (createdCategory) {
            return res.status(422).send('Sorry!! This category already exists')
        } else {
            let category = new Category(categoryData)
            category.save((error, createdCategory) => {
                if (error) {
                    console.log(error)
                } else {
                    return res.status(200).json(createdCategory)
                }
            });
        }
    });
}

exports.update = function(req, res) {
    let categoryData = req.body

    Category.findByIdAndUpdate(req.params._id, { $set: categoryData }, function(error, category) {
        if (error) {
            return res.status(422).send('Oops! Something went wrong with your update request')
        } else {
            return res.status(200).json(category)
        }
    });
}

exports.delete = function(req, res) {
    Category.findByIdAndRemove(req.params._id, function(error, result) {
        if (error) {
            return res.status(422).send('Oops! Something went wrong with your delete request')
        } else {
            return res.status(200).send('You have successfully deleted this category')
        }
    });
}
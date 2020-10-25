// Model Imports
const Fundraiser = require('../models/fundraiser')



exports.all = function(req, res) {
    Fundraiser.find(function(error, fundraisers) {
        if (error) {
            return res.status(422).send('Sorry!! Your request could not be processed at the moment, please try again')
        } else {
            return res.status(200).json(fundraisers)
        }
    });
}

exports.one = function(req, res) {
    Fundraiser.findById(req.params._id)
        .populate('categories')
        .populate('solicitor')
        .exec(function(error, fundraiser) {
            if (error) {
                return res.status(404).send('Sorry!! The queried Fundraiser could not be found or does not exist in our database')
            } else {
                return res.status(200).json(fundraiser)
            }
        }
    );
}

exports.common = function(req, res) {
    Fundraiser.find({ categories: req.params.categories }, function(error, fundraisers) {
        if (error) {
            return res.status(422).send('Sorry no Fundraiser currently exists for this category')
        } else {
            return res.status(200).json(fundraisers)
        }
    });
}

exports.add = function(req, res) {
	let fundraiserData = req.body

	// Presence Verification
    if (!fundraiserData.title) {
        return res.status(422).send('Please provide your fundraiser title')
    }
    if (!fundraiserData.description) {
        return res.status(422).send('Please provide your fundraiser description')
    }
    if (!fundraiserData.categories) {
        return res.status(422).send('Please provide your fundraiser category(ies)')
    }
    if (!fundraiserData.amount) {
        return res.status(422).send('Please provide your fundraiser request amount')
    }


	Fundraiser.findOne({ id: new Fundraiser(fundraiserData._id) }, function(error, createdFundraiser) {
		if (error) {
			return res.status(422).send('Oops! Something went wrong with creating this fundraiser request')
		}

		if (createdFundraiser) {
			return res.status(422).send('Sorry!! This fundraiser request already exists')
        } else {
        	let fundraiser = new Fundraiser(fundraiserData)
        	fundraiser.save((error, createdFundraiser) => {
        		if (error) {
                    console.log(error)
                } else {
                    return res.status(200).json(createdFundraiser)
                }
            });
        }
	});
}

exports.update = function(req, res) {
    let fundraiserData = req.body

    Fundraiser.findByIdAndUpdate(req.params._id, { $set: fundraiserData }, function(error, fundraiser) {
        if (error) {
            return res.status(422).send('Oops! Something went wrong with your update request')
        } else {
            return res.status(200).json(fundraiser)
        }
    });
}

exports.delete = function(req, res) {
    Fundraiser.findByIdAndRemove(req.params._id, function(error, result) {
        if (error) {
            return res.status(422).send('Oops! Something went wrong with your delete request')
        } else {
            return res.status(200).send('You have successfully deleted this fundraiser')
        }
    });
}
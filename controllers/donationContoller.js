// Model Imports
const Donation = require('../models/donation')



exports.all = function(res, req) {
	Donation.find(function(error, donations) {
		if (error) {
            return res.status(422).send('Sorry!! Your request could not be processed at the moment, please try again')
		} else {
			return res.status(200).json(donations);
		}
	});
}

exports.one = function(req, res) {
    Donation.findById(req.params._id)
        .populate('categories')
        .exec(function(error, donation) {
            if (error) {
                return res.status(404).send('Sorry!! The queried Donation could not be found or does not exist in our database')
            } else {
                return res.status(200).json(donation)
            }
        }
    );
}


exports.add = function(req, res) {
	let donationData = req.body
	Donation.findOne({ id: donationData._id }, function(error, createdDonation) {
		if (error) {
			return res.status(422).send('Oops! Something went wrong with creating this donation request')
		}

		if (createdDonation) {
			return res.status(422).send('Sorry!! This donation request already exists')
        } else {
        	let donation = new Donation(donationData)
        	donation.save((error, createdDonation) => {
        		if (error) {
                    console.log(error)
                } else {
                    return res.status(200).json(createdDonation)
                }
            });
        }
	});
}

exports.update = function(req, res) {
    let donationData = req.body

    Donation.findByIdAndUpdate(req.params._id, { $set: donationData }, function(error, donation) {
        if (error) {
            return res.status(422).send('Oops! Something went wrong with your update request')
        } else {
            return res.status(200).json(donation)
        }
    });
}

exports.delete = function(req, res) {
    Donation.findByIdAndRemove(req.params._id, function(error, result) {
        if (error) {
            return res.status(422).send('Oops! Something went wrong with your delete request')
        } else {
            return res.status(200).send('You have successfully deleted this donation')
        }
    });
}
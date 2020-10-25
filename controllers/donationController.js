// Model imports
const Donation = require('../models/donation')



exports.all = function(req, res) {
    Donation.find(function(error, donations) {
        if (error) {
            return res.status(422).send('Sorry!! Your request could not be processed at the moment, please try again')
        } else {
            return res.status(200).json(donations)
        }
    });
}

exports.one = function(req, res) {
    Donation.findById(req.params._id)
        .populate('user')
	    .populate('organization')
	    .populate('fundraiser')
        .exec(function(error, donation) {
            if (error) {
                return res.status(404).send('Sorry!! The queried Donation could not be found or does not exist in our database')
            } else {
                return res.status(200).json(donation)
            }
        }
    );
}

exports.common = function(req, res) {
    Donation.find({ fundraiser: req.params.fundraiser })
    .populate('user')
    .populate('organization')
    .populate('fundraiser')
    .exec(function(error, donations) {
        if (error) {
            return res.status(422).send('Sorry no donation has currently been made for this fundraiser')
        } else {
            return res.status(200).json(donations)
        }
    });
}

exports.add = function(req, res) {
    let donationData = req.body
    Donation.findOne({ _id: donationData._id }, function(error, createdDonation) {
        if (error) {
            return res.status(422).send('Oops! Something went wrong with making this Donation.')
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
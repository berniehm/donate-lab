'use strict';

const mongoose = require('mongoose');

const donationSchema = mongoose.Schema({
  amount: Number,
  method: String,
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});
const User = require('../models/user');
exports.donate = {

  handler: function (request, reply) {
    var userEmail = request.auth.credentials.loggedInUser;
    User.findOne({ email: userEmail }).then(user => {
      let data = request.payload;
      const donation = new Donation(data);
      donation.donor = user._id;
      return donation.save();
    }).then(newDonation => {
      reply.redirect('/report');
    }).catch(err => {
      reply.redirect('/');
    });
  },

};
const Donation = mongoose.model('Donation', donationSchema);
module.exports = Donation;

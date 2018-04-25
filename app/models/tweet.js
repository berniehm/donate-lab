'use strict';
const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  message: String,
  body: String,
  tweeter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});




const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;



















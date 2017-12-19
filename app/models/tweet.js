'use strict';


const mongoose = require('mongoose');
const User = require('../models/user');

const tweetSchema = mongoose.Schema({
  text: String,
  tweeter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});
  const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;



















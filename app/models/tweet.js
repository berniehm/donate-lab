'use strict';
const User = require('../models/user');

const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
  amount: Number,
  method: String,
  tweeter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  candidate:  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
  },

});

















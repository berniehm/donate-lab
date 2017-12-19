
'use strict';

const Tweet = require('../models/tweet');
const Joi = require('joi');
const User = require('../models/user');

exports.home = {

  handler: function (request, reply) {
    reply.view('home', { title: 'Lets Tweet' });
  },

};



exports.report = {

  handler: function (request, reply) {
    Tweet.find({}).exec().then(allTweets => {
      reply.view('report', {
        title: 'Tweets to Date',
        tweets: allTweets,
      });
    }).catch(err => {
      reply.redirect('/');
    });
  },

};
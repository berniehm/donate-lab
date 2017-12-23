
'use strict';

const Tweet = require('../models/tweet');
const Joi = require('joi');
const User = require('../models/user');

exports.home = {

  handler: function (request, reply) {
    reply.view('home', { title: 'Lets Tweet' });
  },

};

exports.signup = {

  handler: (request, reply) => {
    reply.view('signup', { title: 'Sign up for Twitter' });
  },

};

exports.login = {

  handler: (request, reply) => {
    reply.view('login', { title: 'Login to Twitter' });
  },

};
exports.tweet = {

  handler: function (request, reply) {
    let data = request.payload;
    var tweeterEmail = request.auth.credentials.loggedInUser;
    data.tweeter = this.users[tweeterEmail];
    this.tweets.push(data);
    reply.redirect('/report');
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
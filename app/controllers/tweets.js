'use strict';
const Tweet = require('../models/tweet');
const User = require('../models/user');
const Joi = require('joi');




exports.newsfeed = {

  handler: function (request, reply) {

    var userEmail = request.auth.credentials.loggedInUser;
    User.findOne({ email: userEmail }).then(foundUser => {

      Tweet.find({}).populate('author').populate('user').then(allTweets => {


        reply.view('newsfeed', {
          title: 'Newsfeed',
          tweets: allTweets,
          user: foundUser
        });
        console.log("Show timeline for " + userEmail)
      }).catch(err => {
        reply.redirect('/');
      });
    })
  },
};

exports.tweet = {
  validate: {

    payload: {

      body: Joi.string().min(2).required(),
      date: Joi.string().required(),
    },

    failAction: function (request, reply, source, error) {
      reply.view('tweet', {
        title: 'Sign up error',
        errors: error.data.details,
      }).code(400);
    },

  },

  handler: function (request, reply) {
    var userEmail = request.auth.credentials.loggedInUser;
    User.findOne({ email: userEmail }).then(user => {
      let data = request.payload;
      const tweet = new Tweet(data);
      tweet.author = user._id;
      return tweet.save();
    }).then(newTweet => {
      if (userEmail === 'marge@simpson.com'){
        reply.redirect('/admin');
      }
      else {
        reply.redirect('/tweet');
      }
      console.log("Saving tweet from " + userEmail + newTweet)

    }).catch(err => {
      console.log(err);
      reply.redirect('/');
    });
  },

};








exports.my = {

  handler: function (request, reply) {

    var userEmail = request.auth.credentials.loggedInUser;

    if (userEmail === 'marge@simpson.com') {
      User.findOne({email: userEmail}).then(foundUser => {


        Tweet.find({author: foundUser.id}).populate('author').then(allTweets => {
          reply.view('adminmine', {
            title: 'Tweets',
            tweets: allTweets,
          });
          console.log("Show tweets by " + userEmail)
        }).catch(err => {
          reply.redirect('/');
        });
      })
    }
    else
    {
      User.findOne({email: userEmail}).then(foundUser => {

        Tweet.find({author: foundUser.id}).populate('author').then(allTweets => {

          reply.view('mine', {
            title: 'My Tweets',
            tweets: allTweets,
          });
          console.log("Show tweets by " + userEmail)
        }).catch(err => {
          reply.redirect('/');
        });
      })
    }
  }

};


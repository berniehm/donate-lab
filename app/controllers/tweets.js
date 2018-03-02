'use strict';
const Tweet = require('../models/tweet');
const User = require('../models/user');
const Joi = require('joi');



exports.timeline = {

  handler: function (request, reply) {
    Tweet.find({}).populate('tweeter').then(allTweets => {
      reply.view('timeline', {
        title: 'Tweets to Date',
        tweets: allTweets,
      });
    }).catch(err => {
      reply.redirect('/timeline');
    });
  },

};


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

  handler: function (request, reply) {
    var userEmail = request.auth.credentials.loggedInUser;
    User.findOne({ email: userEmail }).then(user => {
      let data = request.payload;
      const tweet = new Tweet(data);
      tweet.tweeter = user._id;
      return tweet.save();
    }).then(newTweet => {
      reply.redirect('/report');
    }).catch(err => {
      reply.redirect('/timeline');
    });
  },

};




exports.makeTweet = {
  validate: {

    payload: {
      text: Joi.string().min(1).max(140).required(),
    },

    failAction: function (request, reply, source, error) {
      Tweet.find({}).then(tweets => {
        reply.view('tweet', {
          title: 'Invalid Tweet',
          tweets: tweets,
          errors: error.data.details,
        }).code(400);
      }).catch(err => {
        reply.redirect('/timeline');
      });
    },
  },

  handler: function (request, reply) {
    const loggedInUser = request.auth.credentials.loggedInUser;
    let tweetData = request.payload;

    User.findOne({ email: loggedInUser }).then(user => {


      tweetData.date = new Date();



      tweetData.tweeter = user.id;
      if ((tweetData.text !== '') || ("'")) {
        const tweet = new Tweet(tweetData);
        if (tweetData.text.length) {
         ;
          ;
        }

        return tweet.save();
      }
    }).then(newTweet => {
      console.log(`>> Tweet sent by: ` + loggedInUser);
      reply.redirect('/');
    }).catch(err => {
      console.log(err);
      reply.redirect('/timeline');
    });
  },
}


exports.my = {

  handler: function (request, reply) {

    let userEmail = request.auth.credentials.loggedInUser;

    if (userEmail === 'marge@simpson.com') {
      User.findOne({email: userEmail}).then(foundUser => {


        Tweet.find({author: foundUser.id}).populate('author').then(allTweets => {
          reply.view('', {
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

          reply.view('my', {
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


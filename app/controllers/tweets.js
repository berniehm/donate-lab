'use strict';
const Tweet = require('../models/tweet');
const User = require('../models/user');
const Joi = require('joi');



exports.mytimeline = {


    handler: function (request, reply) {
      Tweet.find({}).populate('author').then(allTweets => {
        reply.view('report', {
          title: 'tweets to Date',
          tweets: allTweets,
        });0
      }).catch(err => {
        reply.redirect('/');
        console.log(mytimeline);
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
        reply.redirect('/mytimeline');
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
      tweet.tweeter = tweet._id;
      return tweet.save();
    }).then(newTweet => {
      reply.redirect('/mytimeline');
    }).catch(err => {
      reply.redirect('/');
    });
  },

};

exports.deleteTweet = {  handler: function (request, reply) {


    tweets.forEach(function (id) {
      Tweet.findByIdAndRemove(id, function (err) {
        if (err) throw err;
      });
    });

    console.log(`>> Tweet deleted`);
    reply.redirect('/tweetlist');
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
        reply.redirect('/mytimeline');
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
      reply.redirect('/mytimeline');
    }).catch(err => {
      console.log(err);
      reply.redirect('/newsfeed');
    });
  },
}



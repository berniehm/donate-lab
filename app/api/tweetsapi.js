
'use strict';
const Tweet = require('../models/tweet');
const Boom = require('boom');
exports.findOne = {
  auth: false,
  handler: function(req, res) {
    Tweet.findOne({_id: req.params.id}).then(tweet => {
      if(tweet !== null){
       res(tweet);
      }
      res(Boom.notFound('Error finding tweet id'));
    }).catch(err => {
      res(Boom.notFound('Error finding tweet id: ' + err));
    });
  },
};


exports.findAll = {
  auth: false,
  handler: function(req, res) {
    Tweet.find({}).sort({date: -1}).then(tweets => {
      res(tweets);
    }).catch(err => {
      res(Boom.badImplementation('Error accessing database: ' + err));
    });
  },
};


exports.addNewTweet = {
  auth: false,
  handler: function(req, res) {
    const tweet = new Tweet(req.payload);
    tweet.save().then(newTweet => {
      res(newTweet).code(201);//201: HTTP code for resource created
    }).catch(err => {
      res(Boom.badImplementation('Error creating new tweet: ' + err));
    });
  },
};


exports.deleteOne = {
  auth: false,
  handler: function(req, res) {
    Tweet.remove({_id: req.params.id}).then(tweet => {
      res(tweet).code(204);//204: code for no content, ensures deletion
    }).catch(err => {
      res(Boom.notFound('Error finding tweet id: ' + err));
    });
  },
};


exports.deleteAll = {
  auth: false,
  handler: function(req, res) {
    Tweet.remove({}).then(err => {
      res().code(204);
    }).catch(err => {
      res(Boom.badImplementation('Error deleting tweets: ' + err));
    });
  },
};

exports.editTweet = {
  auth: false,
  handler: function(req, res) {
    const newTweet = req.payload;
    const tweetId = req.params.id;
    console.log(newTweet, tweetId);
    Tweet.find({_id: tweetId}).then(foundTweet => {
      foundTweet.memberId = newTweet.message;
    }).catch(err => {
      res(Boom.notFound('Error finding tweet id ' + err));
    })
  }
};
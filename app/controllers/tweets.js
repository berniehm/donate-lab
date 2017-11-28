'use strict';

exports.home = {

  handler: (request, reply) => {
  reply.view('home', { title: 'Welcome to Twitter' });
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

exports.tweets = {

  handler: function (request, reply) {
    let data = request.payload;
    var tweeterEmail=request.auth.credentials.loggedInUser;
    data.tweeter = this.users[tweeterEmail];
    this.tweets.push(data);
    reply.redirect('/report');
  },

};
exports.report = {

  handler: function (request, reply) {
    reply.view('report', {
      title: 'Tweets to Date',
      tweets: this.tweets,
    });
  },

};

'use strict';

exports.home = {

  handler: (request, reply) => {
  reply.view('main', { title: 'Welcome to Twitter' });
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
    data.donor = this.currentUser;
    this.donations.push(data);
    reply.redirect('/report');
  },

};
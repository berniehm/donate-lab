'use strict';

exports.main = {

  handler: function (request, reply) {
    reply.view('main', { title: 'Welcome to Tweets' });
  },

};

exports.signup = {

  handler: function (request, reply) {
    reply.view('signup', { title: 'Sign up for Tweets' });
  },

};

exports.login = {

  handler: function (request, reply) {
    reply.view('login', { title: 'Login to Tweets' });
  },

};

exports.authenticate = {

  handler: function (request, reply) {
    reply.redirect('/home');
  },

};

exports.logout = {

  handler: function (request, reply) {
    reply.redirect('/');
  },

};

exports.register = {

  handler: function (request, reply) {
    const user = request.payload;
    this.users[user.email] = user;
    reply.redirect('/login');
  },

};

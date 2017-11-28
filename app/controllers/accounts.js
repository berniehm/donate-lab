'use strict';

exports.main = {
  auth: false,
  handler: function (request, reply) {
    reply.view('main', { title: 'Welcome to Tweets' });
  },

};

exports.signup = {
  auth: false,
  handler: function (request, reply) {
    reply.view('signup', { title: 'Sign up for Tweets' });
  },

};

exports.login = {
  auth: false,
  handler: function (request, reply) {
    reply.view('login', { title: 'Login to Tweets' });
  },

};

exports.authenticate = {
  auth: false,
  handler: function (request, reply) {
    const user = request.payload;
    if ((user.email in this.users) && (user.password === this.users[user.email].password)) {
      request.cookieAuth.set({
        loggedIn: true,
        loggedInUser: user.email,
      });
      reply.redirect('/home');
    } else {
      reply.redirect('/signup');
    }
  },

};

exports.logout = {
  auth: false,
  handler: function (request, reply) {
    request.cookieAuth.clear();
    reply.redirect('/');
  },

};

exports.register = {
  auth: false,
  handler: function (request, reply) {
    const user = request.payload;
    this.users[user.email] = user;
    reply.redirect('/login');
  },
};

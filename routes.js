
const Accounts = require('./app/controllers/accounts');
const Tweets = require('./app/controllers/tweets');
const Assets = require('./app/controllers/assets');

module.exports = [

  { method: 'GET', path: '/', config: Accounts.main },
  { method: 'GET', path: '/signup', config: Accounts.signup },
  { method: 'GET', path: '/login', config: Accounts.login },
  { method: 'POST', path: '/login', config: Accounts.authenticate },
  { method: 'POST', path: '/register', config: Accounts.register },
  { method: 'GET', path: '/logout', config: Accounts.logout },



  { method: 'GET', path: '/newsfeed', config: Tweets.newsfeed },

  { method: 'POST', path: '/maketweet', config: Tweets.makeTweet },
  { method: 'GET', path: '/mytimeline', config: Tweets.mytimeline },
  { method: 'POST', path: '/tweet', config: Tweets.tweet },
  { method:'POST', path: '/report', config: Tweets.mytimeline},
  { method: 'POST', path: '/deletetweet', config: Tweets.DeleteTweet },
  { method: 'GET', path: '/users', config: Tweets.viewAUser },
  {
    method: 'GET',
    path: '/{param*}',
    config: { auth: false },
    handler: Assets.servePublicDirectory,

  },

];
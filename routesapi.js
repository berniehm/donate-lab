const TweetsApi = require('./app/api/tweetsapi');
const UsersApi = require('./app/api/usersapi');

module.exports = [
  { method: 'GET', path: '/api/candidates', config: UsersApi.find },
  { method: 'GET', path: '/api/candidates/{id}', config: UsersApi.findOne },
  { method:  'GET', path: '/api/tweets', config: TweetsApi.findOne},
  {method:  'GET', path: '/api/tweets',  config: TweetsApi.findAll },
  {method:  'GET', path: '/api/tweets',  config: TweetsApi.deleteAll },
  {method:  'GET', path: '/api/tweets',  config: TweetsApi.deleteOne},
];

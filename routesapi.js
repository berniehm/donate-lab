const TweetsApi = require('./app/api/tweetsapi');
const UsersApi = require('./app/api/usersapi');

module.exports = [
  { method: 'GET', path: '/api/candidates', config: UsersApi.find },
  { method: 'GET', path: '/api/candidates/{id}', config: UsersApi.findOne },
  { method:  'GET', path: '/api/tweets',  config: TweetsApi.findAll },
  { method:  'DELETE', path: '/api/tweets',  config: TweetsApi.deleteAll },
  { method:  'DELETE', path: '/api/tweets/{id}',  config: TweetsApi.deleteOne},
];

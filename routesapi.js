const TweetsApi = require('./app/api/tweetsapi');
const UsersApi = require('./app/api/usersapi');

module.exports = [


  { method:  'GET', path: '/api/tweets',  config: TweetsApi.findAll },
  { method:  'DELETE', path: '/api/tweets',  config: TweetsApi.deleteAll },
  { method:  'DELETE', path: '/api/tweets/{id}',  config: TweetsApi.deleteOne},
 // { method: 'POST', path: '/api/users/authenticate', config: UsersApi.authenticate },
];

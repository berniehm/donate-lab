const TweetsApi = require('./app/api/tweetsapi');
const UsersApi = require('./app/api/usersapi');

module.exports = [
  { method: 'GET', path: '/api/candidates', config: UsersApi.find },
  { method: 'GET', path: '/api/candidates/{id}', config: UsersApi.findOne },

];

'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let dbURI = mongodb://<dbuser>:<dbpassword>@ds247027.mlab.com:47027/tweetstwo';

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function (err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});
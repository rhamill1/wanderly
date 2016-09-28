var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wanderly');

var Experience = require('./experiences');
module.exports.Experience = Experience;

var User = require('./users');
module.exports.User = User;

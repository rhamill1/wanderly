var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  image: String,
  marker:String
});

var User = mongoose.model('User', userSchema);

module.exports = User;

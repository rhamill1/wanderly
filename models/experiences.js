var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var experienceSchema = new Schema({
  title: String,
  date: Date,
  coordinates: {lat: Number, lng: Number},
  image: String,
  author: String,
  note: String,
  bucketList: String,
  createdAt: String
});

var Experience = mongoose.model('Experience', experienceSchema);

module.exports = Experience;

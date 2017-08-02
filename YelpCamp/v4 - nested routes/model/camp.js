
var mongoose = require('mongoose')
var commentSchema = require('./comment');
// camp Schema
var campSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  comments: [commentSchema]
})

module.exports = mongoose.model('camp', campSchema);

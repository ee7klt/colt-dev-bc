
var mongoose = require('mongoose')

// camp Schema
var commentSchema = new mongoose.Schema({
  user: String,
  comment: String
})

module.exports = mongoose.model('comment', commentSchema);

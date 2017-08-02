
var mongoose = require('mongoose')

// comment Schema
module.exports = new mongoose.Schema({
  user: String,
  comment: String
})

//module.exports = mongoose.model('comment', commentSchema);


var mongoose = require('mongoose')

// comment Schema
module.exports = new mongoose.Schema({
  username: String,
  userid: String,
  comment: String,
  userid: String
})

// //
// var commentSchema = mongoose.Schema({
//     text: String,
//     author: String
// });
//
// module.exports = mongoose.model("Comment", commentSchema);

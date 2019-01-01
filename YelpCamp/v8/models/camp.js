
var mongoose = require('mongoose')
var commentSchema = require('./comment');
// camp Schema
var campSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  comments: [commentSchema],
  user: String,
  userid: String
})

module.exports = mongoose.model('camp', campSchema);



// var mongoose = require("mongoose");
//
// var campgroundSchema = new mongoose.Schema({
//    name: String,
//    image: String,
//    description: String,
//    comments: [
//       {
//          type: mongoose.Schema.Types.ObjectId,
//          ref: "Comment"
//       }
//    ]
// });
//
// module.exports = mongoose.model("Campground", campgroundSchema);

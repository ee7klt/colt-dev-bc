'use strict'



var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/blog_demo');
mongoose.Promise = require('bluebird');


// USER - email, name
var userSchema = new mongoose.Schema({
  email: String,
  name: String
});

var User = mongoose.model("User", userSchema);


// POST - title, content
var postSchema = mongoose.Schema({
  title: String,
  content: String
})

var Post = mongoose.model("Post", postSchema);


var newUser = new User({
  email: "kltah1@gmail.com",
  name: "Alex"
})

var newPost = new Post({
  title: "excelsior parco capri",
  content: "an awesome experience!"
})

// var promiseSave = newUser.save()
// promiseSave.then((user) => {
//   console.log(user)
// })
// .catch((err) => {
//   console.log('error saving')
// })
var promiseSavePost = newPost.save()
promiseSavePost.then((post) => {
  console.log(post)
})
.catch((err) => {
  console.log('error saving')
})



// newUser.save((err, res) => {
//   if (err) {console.log(err)}
//   else {console.log(res)}
// })

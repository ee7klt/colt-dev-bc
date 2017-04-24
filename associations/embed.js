'use strict'



var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/blog_demo');
mongoose.Promise = require('bluebird');

// POST - title, content
var postSchema = mongoose.Schema({
  title: String,
  content: String
})
// USER - email, name
var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [postSchema]
});

var User = mongoose.model("User", userSchema);




var Post = mongoose.model("Post", postSchema);

//
// var newUser = new User({
//   email: "richard@feynman.com",
//   name: "Dick"
// })
//
// newUser.posts.push({
//   title: "Quantum Electrodynamics",
//   content: "The theory of light and matter"
// })

// var newPost = new Post({
//   title: "excelsior parco capri",
//   content: "an awesome experience!"
// })

// var promiseSave = newUser.save()
// promiseSave.then((user) => {
//   console.log(user)
// })
// .catch((err) => {
//   console.log('error saving')
// })

// var promiseSavePost = newPost.save()
// promiseSavePost.then((post) => {
//   console.log(post)
// })
// .catch((err) => {
//   console.log('error saving')
// })



// newUser.save((err, res) => {
//   if (err) {console.log(err)}
//   else {console.log(res)}
// })


var dickPromise = User.findOne({name: "Dick"}).exec()
dickPromise
  .then((user) => {
    user.posts.push({
      title: "Quarks and Gluons",
      content: "The strong interaction"
    })
    return user.save();
  })
  .then((user) => console.log(user))
  .catch((err) => console.log(err))

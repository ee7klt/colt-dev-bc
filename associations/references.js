'use strict'



var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/blog_demo_2');
mongoose.Promise = require('bluebird');

// POST - title, content
var postSchema = mongoose.Schema({
  title: String,
  content: String
})
var Post = mongoose.model("Post", postSchema);

// USER - email, name
var userSchema = new mongoose.Schema({
  email: String,
  name: String,
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }]
});

var User = mongoose.model("User", userSchema);
// User.create({
//   email: "bob@gmail.com",
//   name: "Bob Belcher"
// })

// Post.create({
//   title: "How to cook the best burger pt 4",
//   content: "Mustard!"
// }, (err,post) => {
//   console.log(post);
//      User.findOne({name: 'Bob Belcher'}, (err,user) => {
//        console.log('found user')
//        user.posts.push(post)
//        user.save((err,data) => {
//          console.log(data)
//        })
//      })
// })


// var postPromise = Post.create({
//       title: "How to cook the best burger pt 4",
//       content: "Mustard!"
//     }
// postPromise
//   .then((post) => {
//     return User.findOne({'name': 'Bob Belcher'}).exec()
//   }
//   .then((user) => {
//     user.posts.push(post)   // <--- this post was within the scope of previous promise hence inaccessible here
//     return user.save()
//   })
//   .catch((err) => {
//     console.log(err)
//   })

User.findOne({name: 'Bob Belcher'}).populate("posts").exec((err,user) => {
  if (err) console.log(err)
  else {
    console.log(user)
  }
})

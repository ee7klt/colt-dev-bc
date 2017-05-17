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

// create the user
// User.create({
//   email: "bob@gmail.com",
//   name: "Bob Belcher"
// })

// create the post and associate the post with the user
// Post.create({
//   title: "How to cook the best burger pt 2",
//   content: "Mustard!"
// }, (err,post) => {
//   console.log(post);
//   User.findOne({email: "bob@gmail.com"}, (err, user) => {
//     if (err) {
//       console.log(err)
//     } else {
//       user.posts.push(post);
//       user.save((err, document) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(document);
//         }
//       })
//     }
//   })
// })

// DEPRECATED. tbh i don't know that this is doing
// associate the post with the user
// User.findOne({name: 'Bob Belcher'}, (err,user) => {
//   console.log('found user')
//   user.posts.push(post)
//   user.save((err,data) => {
//     console.log(data)
//   })
// })

// this version using promises doesn't work yet
// need to alter it to use async/await because have to access variable earlier in the chain
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

// find user then find all posts for that user
const userPromise = User.findOne({email: 'bob@gmail.com'}).populate("posts").exec();
userPromise.then((user) => {
  console.log(user)
});

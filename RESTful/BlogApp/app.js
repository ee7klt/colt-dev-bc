'use strict'
const express=require('express')
const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));






// FORMS
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
// app.post(‘/ENDPOINT', function(req,res) {
//     console.log(req.body.KEY)
//     res.redirect(“/friends");
// })

// Database
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/BlogApp")   // will create DBNAME if not present
const blogSchema = new mongoose.Schema({
  title: {type: String, unique: true},
  image: {type: String, default: "placeholder.jpg"},
  body: String,
  created: {type: Date, default: Date.now}
})
const blogModel = mongoose.model("blog", blogSchema)   // MODEL is constructor of plural version of COLL_SING
blogModel.create(
  {title: 'My first blog', body: 'This is my first blog'},
  (err, res) => {
    if (err) {
      console.log('error inserting in to BlogApp')
    } else console.log('success inserting in to BlogApp')
  })  // insert OBJ
 // find MATCH_OBJ



app.get('/', function(req,res) {
    res.redirect("blogs");
})

// RESTFUL ROUTES
// Index - List all blogs (GET)
// index.ejs
app.get('/blogs', function(req, res) {
  blogModel.find({}, (err,blogs) => {
    if (err) {
      console.log('cannot find in database')
    } else {
      res.render("index", {blogs: blogs});
    }
  })

})
// New -- Show new blog post form (GET)
// newPost.ejs
app.get('/blogs/new', function(req, res) {
      res.render("new");
})
// Create - create new post then redirect somewhere (POST)
app.post('/blogs', function(req,res) {
    //console.log(req.body.title)
    blogModel.create(
      req.body.blog,
      (err, blog) => {
        if (err) {
          console.log(req.body.blog)
          console.log('error insertin in to BlogApp')
          res.render('new')
        } else {
          //console.log('success creating new blog')
          console.log(blog)
          res.redirect("/");
        }
      })


})


// Show
app.get('/blogs/:id', function(req,res) {
  const id = req.params.id;
  console.log(req.params)

  blogModel.find({"_id":id}, (err,blog) => {
    if (err) {
      console.log('cannot find in database')
    } else {
      console.log(blog)
      res.render("show", {blog: blog[0]});
    }
  })
})
// Edit
// Update
// Destroy


//local
app.listen(3000, function() {
    console.log('server started!');
})

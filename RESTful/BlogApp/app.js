'use strict'
const express=require('express')
const app = express();
const marked = require('marked')
app.set('view engine', 'ejs');
app.use(express.static("public"));



// MARKED
// marked.setOptions({
//   renderer: new marked.Renderer(),
//   gfm: true,
//   tables: true,
//   breaks: false,
//   pedantic: false,
//   sanitize: false,
//   smartLists: true,
//   smartypants: false
// });

// Async highlighting with pygmentize-bundled
marked.setOptions({
  highlight: function (code, lang, callback) {
    require('pygmentize-bundled')({ lang: lang, format: 'html' }, code, function (err, result) {
      callback(err, result.toString());
    });
  }
});

// Using async version of marked
var markdownString = '```js\n console.log("hello"); \n var x = 1 \n function square(x) = x^2```';
var msg;
marked(markdownString, function (err, content) {
  if (err) throw err;
  //console.log(content);
  msg = content;
});

//console.log(marked('I am using __markdown__.'));
//var msg =   marked('# Marked in browser\n\n ## Rendered by *marked*. ```var x = 1;```');
//var msg = marked('```js\n console.log("hello"); \n```')
app.get('/marked', function(req,res) {
    res.render("marked",{msg:msg});
})

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
    } else {
      console.log(res)
      console.log('success inserting in to BlogApp')
    }
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

  if (req.body.blog.image == '') {
    req.body.blog.image = 'placeholder.jpg'
  }
  console.log(req.body.blog)
    blogModel.create(
      req.body.blog,
      (err, blog) => {
        if (err) {
          //console.log(req.body.blog)
          console.log('error insertin in to BlogApp')
          res.render('new')
        } else {
          //console.log('success creating new blog')
          //console.log(blog)
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
      res.redirect('/blogs')
    } else {
      console.log(blog)
      res.render("show", {blog: blog[0]});
    }
  })
})


// Edit
app.get('/blogs/:id/edit', function(req, res) {
  const id = req.params.id
  blogModel.find({"_id":id}, (err,blog) => {
    if (err) {
      console.log('cannot find in database')
      res.redirect('/blogs/'+id)
    } else {
      console.log(blog)
      res.render("edit", {blog: blog[0]});
    }
  })
})




// Update
// Destroy


//local
app.listen(3030, function() {
    console.log('server started!');
})

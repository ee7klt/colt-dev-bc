
var express = require('express');
var router = express.Router({mergeParams: true});
var camp = require('../models/camp');

// NEW CAMP COMMENT: form to add comment about a particular campground
router.get('/new', isLoggedIn, function(req,res) {
  var id = req.params.id;
  camp.findById(id, (err, campground) => {
    if (err) {
      console.log('unable to retrieve camground for comment')
    } else {
      console.log('retrieved campground for comment')
      res.render("comments/new", {campground: campground})
    }
  })

})

// CREATE NEW CAMP COMMENT
router.post('/', isLoggedIn, function(req, res) {
  var id = req.params.id
  camp.findById(id, (err, campground) => {
    if (err) {
      console.log('unable to retrieve camground for creating comment')
    } else {
      // Comment.create(req.body.comment, function(err, comment) {
        console.log('adding comment to camp ... ')
        console.log('username is '+req.user.username)
        console.log('comment is '+ req.body.comment)
        campground.comments.push({username: req.user.username , comment: req.body.comment, id: req.user._id})
        campground.save((err, campground) => {
          if (err) {
            console.log("cannot save after adding comment")
          } else {
            //console.log(campground.comments)
            res.redirect('/campgrounds/'+id)
          }
        })

      // })

    }
  })

})


// middleware to check for Login
function isLoggedIn(req,res,next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

module.exports=router;

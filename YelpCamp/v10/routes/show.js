

var express = require('express');
var router = express.Router({mergeParams: true});
var camp = require('../models/camp');

// EDIT camp
router.get('/campgrounds/:id/edit',function(req,res) {
  var id = req.params.id;
  camp.findById(id, (err, campground) => {
    if (err) {
      console.log('unable to retrieve camground for comment')
    } else {
      console.log('retrieved campground for edit')
      res.render("show/edit", {campground: campground})
    }
  })

})

// UPDATE camp
router.put('/campgrounds/:id/',function(req,res) {
  var id = req.params.id;
  var campground = req.body.campground;
console.log(req.body)
  camp.findByIdAndUpdate(id, campground, (err, campground) => {
    if (err) {
      console.log('unable to retrieve camground for update')
    } else {

      console.log('retrieved campground for update')
      res.redirect(id)
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



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
      console.log('retrieved campground for comment')
      res.render("show/edit", {campground: campground})
    }
  })

})

// UPDATE camp



// middleware to check for Login
function isLoggedIn(req,res,next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

module.exports=router;

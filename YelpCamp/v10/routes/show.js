

var express = require('express');
var router = express.Router({mergeParams: true});
var camp = require('../models/camp');
var user = require('../models/user');
// EDIT camp
router.get('/campgrounds/:id/edit',function(req,res) {
  var id = req.params.id;
  if(req.isAuthenticated()) {
    camp.findById(id, (err, campground) => {
      if (err) {
        console.log('unable to retrieve camground for comment')
      } else {
        console.log('retrieved campground for edit')
        console.log(typeof campground.userid)
        console.log(typeof req.user._id)
        if (req.user._id.equals(campground.userid)) {
          res.render("show/edit", {campground: campground})
        } else {
          res.send('you are not authorized to edit this camp either because you are not logged in or because this camp does not belong to you')
        }

      }
    })
  } else {
    console.log("you need to be logged in to do that");
    res.send("you need to be logged in to do that");
  }
})

// DELETE camp
router.delete('/campgrounds/:id/',function(req,res) {
  var id = req.params.id;
  camp.findByIdAndRemove(id, (err, campground) => {
    if (err) {
      console.log('unable to retrieve camground for delete')
    } else {
      console.log('deleted '+ id )
      res.redirect('/campgrounds')
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

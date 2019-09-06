

var express = require('express');
var router = express.Router({mergeParams: true});
var camp = require('../models/camp');
var user = require('../models/user');
const middlewareObj = require('../middleware/index.js');
const checkCampgroundOwnership = middlewareObj.checkCampgroundOwnership;

// EDIT camp
router.get('/campgrounds/:id/edit', checkCampgroundOwnership, function(req,res) {
      var id = req.params.id;
      camp.findById(id, (err, campground) => {
        res.render("show/edit", {campground: campground})
      })
})

// DELETE camp
router.delete('/campgrounds/:id/',checkCampgroundOwnership,function(req,res) {
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
router.put('/campgrounds/:id/',checkCampgroundOwnership,function(req,res) {
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


// middleware authentication (is logged in person authorized to edit etc.)





module.exports=router;

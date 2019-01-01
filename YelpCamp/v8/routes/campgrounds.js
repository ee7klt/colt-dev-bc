var express = require('express');
var router = express.Router();
var camp = require('../models/camp');

//INDEX: show all campgrounds
router.get('/', function(req,res) {
  camp.find({}, (err, campgrounds) => {
    if (err) {
      console.log('unable to retrieve campgrounds')
    } else {
      console.log('retrieved campgrounds')
      console.log(req.user)
      res.render("campgrounds/campgrounds", {campgrounds: campgrounds, currentUser: req.user})
    }
  })

})


// NEW
router.get('/new', isLoggedIn, function(req,res){
  res.render('campgrounds/new');
})

// CREATE: add new campground to database
router.post('/', isLoggedIn, function(req,res) {
  //campgrounds.push({name:req.body.camp, image:"http://lorempixel.com/400/200/"})
  var name = req.body.camp;
  var image = req.body.image;
  var desc = req.body.desc;
  var newCamp = {name: name, image: image, description: desc, user: req.user.username, userid: req.user._id};
  camp.create(newCamp, function(err,res) {
    if(err) {
      console.log('error creating new document')
    } else {
      console.log('new document created')
      //console.log(res)
      //console.log(res)
    }
  })
  // redirect defaults as GET.
  // so even though we have two routes with campgrounds
  // will choose teh GET.
  res.redirect('campgrounds')
})


// SHOW: shows more info about 1 campground
router.get('/:id', function(req, res) {
  var id = req.params.id;
  console.log(id)
  camp.findById(id, function(err, campground) {
    if (err) {
      console.log(id + ' not found.')
    } else {
      //console.log('found route for ' + campground)
      //console.log(campground)
      res.render('campgrounds/show', {campground: campground});
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

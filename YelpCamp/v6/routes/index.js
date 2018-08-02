var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');
router.get('/', function(req,res) {
  res.render("landing");
})


// ============
// AUTH ROUTES
// ===========

// show register form
router.get('/register', function(req, res) {
  res.render('register')
})

// handle register form POST
router.post('/register', function(req,res) {
  //res.send(req.body)
  var newUser = new User({
    username:req.body.username
  });
  User.register(newUser,
  req.body.password,
  function(err,user){
    if(err) {
      console.log(err);
      return res.render('register'); // return will shortcircuit and pass out block
    }
    passport.authenticate('local')(req, res, function(){
      res.redirect('/');    // logs the user in.
    })
  }
)
})


// show login form
router.get('/login', function(req,res){
  res.render('login');
})

// handle login POST
router.post('/login', passport.authenticate('local', {
  successRedirect:'/',
  failureRedirect:'/login'
}),function(req,res){})

//get LOGOUT
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
})






module.exports=router;

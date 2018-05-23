var express = require('express');
var app = express();
app.use(require('express-session')(
  {secret:'secretkey',
  resave: false,
  saveUninitialized: false}
))
app.set('view engine','ejs');

app.set('port',process.env.PORT || 3400);
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/auth_demo_app');
var passport = require('passport');

var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var User = require('./models/user');
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(bodyParser.urlencoded({extended:true}))
// =================
// ROUTES
// =================



// set root route
app.get('/', function(req,res){
  res.render('home');
})
app.get('/secret', function(req,res){
  res.render('secret');
})

// Auth Routes

// show sign up form
app.get('/register', function(req,res){
  res.render('register')
})
// handling user sign up
app.post('/register', function(req,res){
  User.register(new User({username: req.body.username}),
                req.body.password,
                function(err,user){
                  if(err) {
                    console.log(err);
                    return res.render('register');
                  }
                  passport.authenticate('local')(req, res, function(){
                    res.redirect('/secret');
                  })
                }
  )
})


// LOGIN ROUTES
// render login form

app.get('/login', function(req,res){
  res.render('login')
})


// handle user login


app.listen(app.get('port'), function(){
  console.log('server started on port ' + app.get('port'));
})

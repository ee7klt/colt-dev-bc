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
passport.use(new LocalStrategy(User.authenticate()));
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
app.get('/secret', isLoggedIn, function(req,res){
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
app.post('/login', passport.authenticate('local', {
  successRedirect:'/secret',
  failureRedirect:'/login'
}),  function(req,res){
  User.find({'username':req.body.username},
    function(err,user) {
      if (user.length === 0) {
        console.log('error cannot find user in db')
      } else {
        console.log('login successful')
      }
      res.redirect('/login')
    }
)
})


// LOGOUT
app.get('/logout', function(req,res){
  req.logout();
  res.redirect('/')
})


// check if logged in using middleware
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('login')
}

app.listen(app.get('port'), function(){
  console.log('server started on port ' + app.get('port'));
})

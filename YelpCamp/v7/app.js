'use strict'
const express=require('express')
const app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));



const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
var mongoose = require('mongoose');
mongoose.plugin(schema => { schema.options.usePushEach = true });
mongoose.connect('mongodb://localhost/campsDB');
var camp = require('./models/camp');
var seedDB = require('./seeds');
var User = require('./models/user');
// var Comment = require('./models/comment')

// PASSPORT CONFIGURATION
app.use(require('express-session')(
  {secret:'secretkey',
  resave: false,
  saveUninitialized: false}
))
var passport = require('passport');
var LocalStrategy = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


var commentRoutes = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    indexRoutes = require('./routes/index');
// middleware for passing through userdata on all routes
// needs to come after passport initialization
  app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
  });

app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);




//seedDB();


app.listen(3300, function() {
  console.log('server started at port 3300!');
})

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

// middleware for passing through userdata on all routes
// needs to come after passport initialization
app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  next();
});

//seedDB();

// using seed.js instead now.
// let campgrounds = [
//   {name: 'Ootoro Creek',  image:"http://lorempixel.com/100/100/", description:"Smooth and fatty"},
//   {name: 'Hamachi Mountain',  image:"http://lorempixel.com/200/100/", description: "bouncy"},
//   {name: 'Uni River', image:"http://lorempixel.com/200/100/", description:"tangy"}
// ];

// camp.create(campgrounds[0], (err,res) => {
//   if (err) {
//     console.log('failure')
//   }
//   else {
//     console.log('success')
//   }
// })

// seed the database with campgrounds
// if campground already present in db, skip inserting it.
// commenting this out in yelpcamp:seeding the DB
// because we'll use seeds.js instead to initizlize db.
// campgrounds.forEach(x => {
//   //console.log('looping over campgrounds')
//   camp.find({name: x.name}, function(err, res) {
//     if (err) {
//       console.log('error querying collection')
//     } else {
//       if (res.length === 0) {
//         console.log('campground '+x.name+' absent. creating ...')
//         camp.create(x,
//           function(err,res) {
//             if (err) {console.log('unable to insert object in to db') }
//             else {console.log('successfully inserted' + res)}
//           })
//         }
//       else {
//         console.log('campground '+x.name+' already present. skipping')
//         console.log(res.length)
//       }
//       }
//     })
//   }
// )





app.get('/', function(req,res) {
  res.render("landing");
})


//INDEX: show all campgrounds + NEW: form to submit campground
app.get('/campgrounds', function(req,res) {
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


// CREATE: add new campground to database
app.post('/campgrounds', function(req,res) {
  //campgrounds.push({name:req.body.camp, image:"http://lorempixel.com/400/200/"})
  var name = req.body.camp;
  var image = req.body.image;
  var desc = req.body.desc;
  var newCamp = {name: name, image: image, description: desc};
  camp.create(newCamp, function(err,res) {
    if(err) {
      console.log('error creating new document')
    } else {
      console.log('new document created')
      console.log(res)
      //console.log(res)
    }
  })
  // redirect defaults as GET.
  // so even though we have two routes with campgrounds
  // will choose teh GET.
  res.redirect('campgrounds/campgrounds')
})


// SHOW: shows more info about 1 campground
app.get('/campgrounds/:id', function(req, res) {
  var id = req.params.id;
  console.log(id)
  camp.findById(id, function(err, campground) {
    if (err) {
      console.log(id + ' not found.')
    } else {
      //console.log('found route for ' + campground)
      console.log(campground)
      res.render('campgrounds/show', {campground: campground});
    }
  })


})


// +++++++++++++++++
// COMMENT ROUTES
// +++++++++++++++++

// middleware to check for Login
function isLoggedIn(req,res,next) {
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/login');
}

// NEW CAMP COMMENT: form to add comment about a particular campground
app.get('/campgrounds/:id/comments/new', isLoggedIn, function(req,res) {
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
app.post('/campgrounds/:id/comments', isLoggedIn, function(req, res) {
  var id = req.params.id
  camp.findById(id, (err, campground) => {
    if (err) {
      console.log('unable to retrieve camground for creating comment')
    } else {
      // Comment.create(req.body.comment, function(err, comment) {
        console.log('adding comment to camp ... ', req.body.comment)
        campground.comments.push(req.body.comment);
        console.log(campground);
        campground.save((err, campground) => {
          if (err) {
            console.log("cannot save after adding comment")
            console.log(err)
          } else {
            console.log(campground)
            res.redirect('/campgrounds/'+id)
          }
        })

      // })

    }
  })

})


// ============
// AUTH ROUTES
// ===========

// show register form
app.get('/register', function(req, res) {
  res.render('register')
})

// handle register form POST
app.post('/register', function(req,res) {
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
app.get('/login', function(req,res){
  res.render('login');
})

// handle login POST
app.post('/login', passport.authenticate('local', {
  successRedirect:'/',
  failureRedirect:'/login'
}),function(req,res){})

//get LOGOUT
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
})

app.listen(3300, function() {
  console.log('server started at port 3300!');
})

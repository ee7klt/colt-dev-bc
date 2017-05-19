'use strict'
const express=require('express')
const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/campsDB');
var camp = require('.model/camp');




let campgrounds = [
  {name: 'Ootoro Creek',  image:"http://lorempixel.com/100/100/", description:"Smooth and fatty"},
  {name: 'Hamachi Mountain',  image:"http://lorempixel.com/200/100/", description: "bouncy"},
  {name: 'Uni River', image:"http://lorempixel.com/200/100/", description:"tangy"}
];

// camp.create(campgrounds[0], (err,res) => {
//   if (err) {
//     console.log('failure')
//   }
//   else {
//     console.log('success')
//   }
// })

campgrounds.forEach(x => {
  //console.log('looping over campgrounds')
  camp.find({name: x.name}, function(err, res) {
    if (err) {
      console.log('error querying collection')
    } else {
      if (res.length === 0) {
        console.log('campground '+x.name+' absent. creating ...')
        camp.create(x,
          function(err,res) {
            if (err) {console.log('unable to insert object in to db') }
            else {console.log('successfully inserted' + res)}
          })
        }
      else {
        console.log('campground '+x.name+' already present. skipping')
        console.log(res.length)
      }
      }
    })
  }
)





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
      //console.log(campgrounds)
      res.render("campgrounds", {campgrounds: campgrounds})
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
  res.redirect('/campgrounds')
})


// SHOW: shows more info about 1 campground
app.get('/campgrounds/:id', function(req, res) {
  var id = req.params.id;
  camp.findById(id, function(err, campground) {
    if (err) {
      console.log(id + ' not found.')
    } else {
      console.log('found route for ' + campground)
      res.render('show', {campground: campground});
    }
  })


})

app.listen(3000, function() {
  console.log('server started!');
})

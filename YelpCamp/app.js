'use strict'
const express=require('express')
const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/campsDB');

// camp Schema
var campSchema = new mongoose.Schema({
  name: String,
  image: String
})
var camp = mongoose.model('camp', campSchema);




let campgrounds = [
  {name: 'Ootoro Creek',  image:"http://lorempixel.com/100/100/"},
  {name: 'Hamachi Mountain',  image:"http://lorempixel.com/200/100/"},
  {name: 'Uni River', image:"http://lorempixel.com/200/100/"}
];

campgrounds.forEach(x => {
  camp.find({name: x.name}, function(absent, present) {
    if (absent) {
      camp.create(x,
      function(err,res) {
        if (err) {console.log('unable to insert object in to db') }
        else {console.log('successfully inserted' + res)}
      })
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
 camp.create({name:req.body.camp, image:"http://lorempixel.com/200/100/"}, function(err,res) {
   if(err) {
     console.log('error creating new document')
   } else {
     console.log('new document created')
     //console.log(res)
   }
 })
  // redirect defaults as GET.
  // so even though we have two routes with campgrounds
  // will choose teh GET.
  res.redirect('/campgrounds')
})


// SHOW
app.get('/campgrounds/:id', function(req, res) {
  var campground = req.params.id;
  console.log('found route for ' + campground)
  res.render('thisCamp', {campground:campground});
})

app.listen(3000, function() {
    console.log('server started!');
})

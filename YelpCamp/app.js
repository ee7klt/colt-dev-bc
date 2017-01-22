'use strict'
const express=require('express')
const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/campsDB');
var campSchema = new mongoose.Schema({
  name: String,
  image: String
})
var camp = mongoose.model('camp', campSchema);




let campgrounds = [
  {name: 'Ootoro Creek',  image:"http://lorempixel.com/400/200/"},
  {name: 'Hamachi Mountain',  image:"http://lorempixel.com/400/200/"},
  {name: 'Uni River', image:"http://lorempixel.com/400/200/"}
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

app.get('/campgrounds', function(req,res) {
    res.render("campgrounds", {campgrounds: campgrounds});
})

app.post('/campgrounds', function(req,res) {
  //campgrounds.push({name:req.body.camp, image:"http://lorempixel.com/400/200/"})
 camp.create({name:req.body.camp, image:"http://lorempixel.com/400/200/"}, function(err,res) {
   if(err) {
     console.log('error creating new document')
   } else {
     console.log('new document created')
     console.log(res)
   }
 })
  // redirect defaults as GET.
  // so even though we have two routes with campgrounds
  // will choose teh GET.
  res.redirect('/campgrounds')
})


app.listen(3000, function() {
    console.log('server started!');
})

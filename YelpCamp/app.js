'use strict'
const express=require('express')
const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));


let campgrounds = [
  {name: 'Ootoro Creek',  image:"http://lorempixel.com/400/200/"},
  {name: 'Hamachi Mountain',  image:"http://lorempixel.com/400/200/"},
  {name: 'Uni River', image:"http://lorempixel.com/400/200/"}];

app.get('/', function(req,res) {
    res.render("landing");
})

app.get('/campgrounds', function(req,res) {
    res.render("campgrounds", {campgrounds: campgrounds});
})

app.post('/campgrounds', function(req,res) {
  campgrounds.push({name:req.body.camp, image:"http://lorempixel.com/400/200/"})

  // redirect defaults as GET.
  // so even though we have two routes with campgrounds
  // will choose teh GET.
  res.redirect('/campgrounds')
})


app.listen(3000, function() {
    console.log('server started!');
})

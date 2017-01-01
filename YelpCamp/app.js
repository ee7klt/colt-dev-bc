'use strict'
const express=require('express')
const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));

const campgrounds = [
  {name: 'Ootoro Creek',  image:"http://lorempixel.com/400/200/"},
  {name: 'Hamachi Mountain',  image:"http://lorempixel.com/400/200/"},
  {name: 'Uni River', image:"http://lorempixel.com/400/200/"}];

app.get('/', function(req,res) {
    res.render("landing");
})

app.get('/campgrounds', function(req,res) {
    res.render("campgrounds", {campgrounds: campgrounds});
})

app.listen(3000, function() {
    console.log('server started!');
})

'use strict'
const express=require('express')
const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));

const campgrounds = ['Ootoro Creek', 'Hamachi Mountain', 'Uni River'];

app.get('/', function(req,res) {
    res.render("landing");
})

app.get('/campgrounds', function(req,res) {
    res.render("campgrounds", {campgrounds: campgrounds});
})

app.listen(3000, function() {
    console.log('server started!');
})

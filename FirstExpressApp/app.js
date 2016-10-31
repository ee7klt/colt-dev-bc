var express = require("express");


// cf catme. it only had one function so we execute catme()
//var catMe = require('cateme')
//catme(); 
// express however has lots of different ones
// but wiill execute it and save it to variable app

var app = express();

// use as app.SOMEMETHOD

//define our first route
// "/" =>  "Hi there!"
app.get("/", function(req,res){
    res.send("Hi there!");
})
// "/bye" => "Goodbye"
app.get("/bye", function(req,res){
    res.send("goodbye!");
})
// "/dog" => "meow"
app.get("/dog", function(req,res){
    console.log("someone made a request")
    res.send("meow!");
})

app.get("/r/:subredditName", function(req,res) {
    console.log(req.params)
    var subreddit=req.params.subredditName
    res.send("welcome to the "+subreddit+" subreddit!");
})


app.get("*", function(req,res) {
  
    res.send("you are a star*!");
})
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server has started")
})
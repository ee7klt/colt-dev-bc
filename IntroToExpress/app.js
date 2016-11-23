'use strict'
var express = require('express');
var app = express();

app.get("/",function(req,res) {
    res.send('Hi there, welcome to my assignment');
});

app.get("/sounds/:animal", function(req, res) {
    const sounds = {
        dog: "meow",
        pig: "oink"
    }
    let animal = req.params.animal.toLowerCase()
    let sound = sounds[animal]
    res.send(sound)
})

app.get("/repeat/:message/:n",function(req,res) {
    var message = req.params.message;
    var n = req.params.n;
    res.send((message+' ').repeat(n));
});

app.get("*", function(req, res) {
    res.send("Sorry, page not found ... ");
})


app.listen(process.env.PORT, process.env.IP, function() {
    console.log('server has started');
});
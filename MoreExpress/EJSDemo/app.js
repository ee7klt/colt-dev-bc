'use strict'

const express = require('express');
const app = express();

app.get('/', function(req,res) {
    res.render("home.ejs");
})


app.get('/fallinlovewith/:thing', function(req,res) {
    var thing = req.params.thing;
    res.render("love.ejs",{thing: thing});
})





app.listen(process.env.PORT, process.env.IP, function() {
    console.log('server has started');
});

'use strict'

const express = require('express');
const app = express();

app.get('/', function(req,res) {
    res.render("home.ejs");
})

app.get('/posts', function(req, res) {
    var posts = [
            {title:"post 1", author: "Susy"},
            {title:"post 2", author: "Tom"},
            {title:"post 3", author: "Dick"}
        ];
    res.render("posts.ejs", {posts: posts})
})

app.get('/fallinlovewith/:thing', function(req,res) {
    var thing = req.params.thing;
    res.render("love.ejs",{thing: thing});
})


app.get('*', function(req, res) {
    res.render("404.ejs");
})




app.listen(process.env.PORT, process.env.IP, function() {
    console.log('server has started');
});

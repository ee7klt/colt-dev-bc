'use strict'

const express = require('express');
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.get('/', function(req,res) {
    res.render("home");
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
    res.render("love",{thing: thing});
})


app.get('*', function(req, res) {
    res.render("404");
})




app.listen(process.env.PORT, process.env.IP, function() {
    console.log('server has started');
});

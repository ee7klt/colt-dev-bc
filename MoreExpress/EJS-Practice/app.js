
'use strict'

const express = require('express');
const app = express();


app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', function(req, res) {
    res.render('home')
})

app.get('/loop/:name', function(req, res) {
    const name = req.params.name;
    const data = [
      {"item": "chromebook", "price":  "299"},
        {"item": "collagen", "price":  "20"}
    
    ];
    res.render('loop', {name: name, data: data});
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server has started")
})
var express = require('express');
var app = express();

app.get("/",function(req,res) {
    res.send('Hi there, welcome to my assignment');
});

app.get("/repeat/:message/:n",function(req,res) {
    var message = req.params.message;
    var n = req.params.n;
    res.send((message+' ').repeat(n));
});



app.listen(process.env.PORT, process.env.IP, function() {
    console.log('server has started');
});
 'use strict'
const express=require('express')
const app = express();
const request = require('request')
const marked = require('marked')

app.set('view engine', 'ejs');
app.use(express.static("public"));

console.log(marked('I am using __markdown__.'))



app.get('/', function(req,res) {
    res.send("home");
})

app.get('/results', function(req,res) {
  const endpoint = "http://www.omdbapi.com/?s=peter";
  request(endpoint, function(error, response, body) {
    const data = JSON.parse(body)
    res.render('results',{data: data["Search"]})
  })
})


app.listen(3000, function() {
    console.log('server started!');
})

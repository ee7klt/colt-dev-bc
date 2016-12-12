 'use strict'
const express=require('express')
const app = express();
const request = require('request')
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));





app.get('/', function(req,res) {
    res.send("home");
})



app.get('/search',function(req,res) {
res.render('search')
console.log('search page')
  //endpoint=endpoint+req.query.search
  //res.redirect('/results');
})

// app.post('/requestKeyword', function(req,res) {
//   console.log('requestKeyword POST route reached')
//   console.log(req.body.keyword)
//   endpoint=endpoint+req.body.keyword
//   res.redirect('/results')
// })


app.get('/results', function(req,res) {
  let endpoint = 'http://www.omdbapi.com/?s='
  endpoint=endpoint+req.query.search
  request(endpoint, function(error, response, body) {
    if(!error && response.statusCode == 200) {
    const data = JSON.parse(body)
    res.render('results',{data: data["Search"]})
  } else console.log('error fetching data')
  })
})


app.listen(3000, function() {
    console.log('server started!');
})

'use strict'

const express=require('express')
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

 let friends = [
        "Tony", "Ivanka", "Drumpf"
        ];

app.get('/',function(req,res) {
    res.render('home');
})

app.post('/addFriend', function(req, res) {
    const newFriend = req.body.newFriend;
    friends.push(newFriend);
    console.log(friends);
    res.redirect("/friends");
})

app.get('/friends',function(req,res) {
   
    res.render('friends', {friends: friends});
})




app.listen(process.env.PORT, process.env.IP, function() {
    console.log('server started!');
})
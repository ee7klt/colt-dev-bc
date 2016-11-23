const express=require('express')
const app = express();


app.set('view engine', 'ejs');
app.use(express.static("public"));


app.get('/', function(req, res) {
    res.render('homepage')
})











app.listen(process.env.PORT, process.env.IP, function() {
    console.log('server started!');
})

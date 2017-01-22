var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cat_app');

var catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});

var catModel = mongoose.model('cat', catSchema)

// add cat to db
var george = new catModel({
  name: "George",
  age: 11,
  temperament: "Grouchy"
})

george.save(function(err, res) {
  if (err) {
    console.log("cannot save")
  } else {
    console.log("saved!")
    console.log(res)
  }
});

// retrieve all cats from db

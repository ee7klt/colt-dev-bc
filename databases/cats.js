var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cat_app');

var catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String
});

var catModel = mongoose.model('cat', catSchema)

// add cat to db
// var george = new catModel({
//   name: "Mrs. Norris",
//   age: 1,
//   temperament: "Evil"
// })

// george.save(function(err, res) {
//   if (err) {
//     console.log("cannot save")
//   } else {
//     console.log("saved!")
//     console.log(res)
//
//   }
// });

// catModel.create({
//   name: "one less",
//   age: 14
// }, function(err, res) {
//   if (err) {
//     console.log("oh no!")
//   } else {
//     console.log(res)
//   }
// })

// retrieve all cats from db
catModel.find({name: ''}, function(err, res) {
  if(err) {
    console.log('oh no!')
  } else {
    console.log('found cat')
    console.log(res)
  }
})

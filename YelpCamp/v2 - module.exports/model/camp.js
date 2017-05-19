
var mongoose = require('mongoose')

// camp Schema
var campSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
})

module.exports = mongoose.model('camp', campSchema);

'use strict'


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/campsDB');
mongoose.Promise = require('bluebird');
const camp = require('./model/camp');

const seedDB = () => {

// remove all campgrounds
camp.remove({}, (err) => {
  if (err) {
    console.log('seed.js: error removing object')
  }
  else {
    console.log('seed.js: cleared db')
  }
})

// add a few campgrounds
let campgrounds = [
  {name: 'Ootoro Creek',  image:"http://lorempixel.com/100/100/", description:"Smooth and fatty", comments: [{user:'ee7klt', comment:'js rocks'}]},
  {name: 'Hamachi Mountain',  image:"http://lorempixel.com/200/100/", description: "bouncy", comments: []},
  {name: 'Uni River', image:"http://lorempixel.com/200/100/", description:"tangy"}
];

camp.collection.insert(campgrounds, (err, docs) => {
  if (err) {
    console.log('seeds:js error seeding campgrounds');
  } else {
    console.log('seeds.js: campgrounds seeded');
    console.log('+++++++++++++++++++');
    console.log(docs)
    console.log('+++++++++++++++++++')
  }
})

camp.findOne({name:'Ootoro Creek'}, (err, camp) => {
  if (err) {
    console.log(err)
  }
  else {
    console.log(camp.comments)
  }
})


// insertPromise
// .then((docs) => {
//   console.log('seeds.js: success seeding campgrounds:');
//   console.log('==================')
//   console.log(docs)
//   console.log('==================')
// })
// .catch((err) => {
//   console.log('seeds.js: error seeding campgrounds:');
//   console.log('==================')
//   console.log(err)
//   console.log('==================')
// })

// add a few comments

}

module.exports = seedDB;

'use strict'


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/campsDB');
mongoose.Promise = require('bluebird');
const camp = require('./models/camp');

const seedDB = () => {

  // array of camp documents
  let campgrounds = [
    {
      name: 'Torres del Paine',
      image:"/images/camp1.jpg",
      description:"Torres del Paine National Park (Spanish: Parque Nacional Torres del Paine)[3] is a national park encompassing mountains, glaciers, lakes, and rivers in southern Chilean Patagonia. The Cordillera del Paine is the centerpiece of the park. It lies in a transition area between the Magellanic subpolar forests and the Patagonian Steppes. The park is located 112 km (70 mi) north of Puerto Natales and 312 km (194 mi) north of Punta Arenas. The park borders Bernardo O'Higgins National Park to the west and the Los Glaciares National Park to the north in Argentine territory. Paine means <em>blue</em> in the native Tehuelche (Aonikenk) language and is pronounced PIE-nay."
    },
    {
      name: 'Cordillera',
      image:"/images/camp2.jpg",
      description: "A cordillera is an extensive chain of mountains or mountain ranges. The term is a borrowing from Spanish, in which it has the same meaning. The Spanish word originates from cordilla, a diminutive of <em>cuerda</em>, or <em>rope</em>. It is most commonly used in the field of physical geography.",
      comments: []
    },
    {
      name:'Caraterra Austral',
      image:"/images/camp3.jpg",
      description:"The Carretera Austral (CH-7, in english: Southern Way) is the name given to Chile's Route 7. The highway runs about 1,240 kilometers (770 mi) from Puerto Montt to Villa O'Higgins through rural Patagonia.[1] Carretera Austral provides road access to Chile's Aysén del General Carlos Ibáñez del Campo Region and southern part of Los Lagos Region. These areas are sparsely populated and despite its length, Carretera Austral provides access to only about 100,000 people. South of the highway's start in Puerto Montt, Coyhaique (population 44,850[2]) is the largest city along it."
    }
  ];

// remove all campgrounds
camp.remove({}, (err) => {
  if (err) {
    console.log('seed.js: error removing object')
  }
  else {
    console.log('seed.js: cleared db')
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
  }
})




// camp.findOne({name:'Ootoro Creek'}, (err, camp) => {
//   if (err) {
//     console.log(err)
//   }
//   else {
//     console.log(camp.comments)
//   }
// })


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

const faker = require('faker');


// print out n products and their prices
const fakeProducts = (n) => {
   if (n == 0) return 
   else {
       console.log(faker.fake("{{commerce.productName}} - ${{commerce.price}}"));
       fakeProducts(n-1);
   }
};

fakeProducts(10)
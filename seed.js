const mongoose = require("mongoose");

const product = require('./models/product');
mongoose.connect("mongodb://127.0.0.1:27017/farmStand")
  .then(() => {
    console.log("MONGOOSE CONNECTION OPEN!!!");
  })
  .catch((err) => {
    console.log("OH NO MONGO ERROR!!!!");
    console.log(err);
  });

//   const p = new product({
//         name: "Ruby grapes",
//         price: 3.99,
//         category: 'fruit',
//   })

const seedProducts = [
        {
            name: 'Fairy Eggplant',
            price: 1.00,
            category: 'vegetable'
        },
        {
            name: 'Organic Goddess Melon',
            price: 4.99,
            category: 'fruit'
        },
        {
            name: 'Organic Mini Seedless Watermelon',
            price: 3.99,
            category: 'fruit'
        },
        {
            name: 'Organic Celery',
            price: 1.50,
            category: 'vegetable'
        },
        {
            name: 'Chocolate Whole Milk',
            price: 2.69,
            category: 'dairy'
        },
    ]
  product.insertMany(seedProducts)
  .then(p => {
        console.log(p)
  })
  .catch(e => {
        console.log(e)
  })
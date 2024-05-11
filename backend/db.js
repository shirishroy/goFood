// const mongoose = require('mongoose');
// const mongoURI = 'mongodb://localhost:27017/gofood';

// const mongoDB = async () => {
//   try {
//     // Connect to MongoDB
//     await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
//     console.log('Connected to MongoDB');

//     // Fetch data from "fooditems" collection
//     const fetchedData = await mongoose.connection.db.collection("fooditems");
//     fetchedData.find({}).toArray(async function(err, data) {
//       const foodcategory = await mongoose.connection.db.collection("foodcategory");
//       foodcategory.find({}).toArray(function(err, catData) {
//         if (err) {
//           console.error('Error fetching data:', err.message);
//         } else {
//           global.fooditems = data;
//           global.foodcategory = catData;
//         }
//       });
//     });
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error.message);
//   }
// };


// const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017/gofood";

// const mongoDB = async () => {
//   try {
//     await mongoose.connect(mongoURI, { useNewUrlParser: true });

//     console.log('Connected to MongoDB');

//     const fetchedData = await mongoose.connection.db.collection("fooditems").find({}).toArray(function(err, data) {
    
//       if (err) {
//         console.error('Error fetching data:', err.message);
//       } else {
//         global.fooditems = data;
//         console.log(global.fooditems);
//       }
//     });
//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error.message);
//   }
// };

// module.exports = mongoDB;
const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/gofood"; // Include the database name "gofood"

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log('Connected to MongoDB');

    const fetchedData = await mongoose.connection.db.collection("fooditems").find({}).toArray();
    console.log('Fetched food items:', fetchedData);

    const foodCategory = await mongoose.connection.db.collection("foodcategory").find({}).toArray();
    console.log('Fetched food categories:', foodCategory);

    global.fooditems = fetchedData;
    global.foodcategory = foodCategory;

    console.log('Global fooditems:', global.fooditems);
    console.log('Global foodcategory:', global.foodcategory);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

module.exports = mongoDB;









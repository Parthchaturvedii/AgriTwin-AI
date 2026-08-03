const mongoose = require("mongoose");
const CropPrice = require("../models/CropPrice");

require("dotenv").config();


const data = [

{
 crop:"Wheat",
 state:"Uttar Pradesh",
 season:"Rabi",
 month:"January",
 price:2450
},

{
 crop:"Wheat",
 state:"Uttar Pradesh",
 season:"Rabi",
 month:"February",
 price:2600
},

{
 crop:"Rice",
 state:"Uttar Pradesh",
 season:"Kharif",
 month:"August",
 price:3200
},

{
 crop:"Maize",
 state:"Uttar Pradesh",
 season:"Kharif",
 month:"July",
 price:2200
}

];


const seedDB = async()=>{

await mongoose.connect(process.env.MONGO_URI);


await CropPrice.deleteMany();


await CropPrice.insertMany(data);


console.log("Crop price data inserted");


process.exit();

};


seedDB();
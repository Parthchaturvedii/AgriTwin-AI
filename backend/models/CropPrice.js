const mongoose = require("mongoose");


const cropPriceSchema = new mongoose.Schema({

    crop:{
        type:String,
        required:true
    },

    state:{
        type:String,
        required:true
    },

    season:{
        type:String,
        required:true
    },

    month:{
        type:String,
        required:true
    },

    price:{
        type:Number,
        required:true
    }

},
{
    timestamps:true
});


module.exports = mongoose.model(
    "CropPrice",
    cropPriceSchema
);
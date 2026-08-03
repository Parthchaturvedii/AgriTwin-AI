const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
{
    listing:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CropListing",
        required:true
    },

    farmer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    quantity:{
        type:Number,
        required:true
    },

    unit:{
        type:String,
        enum:["Kg","Quintal","Ton"],
        default:"Quintal"
    },

    offeredPrice:{
        type:Number,
        required:true
    },

    totalAmount:{
        type:Number,
        required:true
    },

    status:{
        type:String,
        enum:[
            "Pending",
            "Accepted",
            "Rejected",
            "Cancelled",
            "Completed"
        ],
        default:"Pending"
    },

    paymentStatus:{
        type:String,
        enum:[
            "Pending",
            "Paid"
        ],
        default:"Pending"
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("Order",orderSchema);
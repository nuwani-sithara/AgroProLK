const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cropdetailsSchema = new Schema({

    name : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    phoneNumber : {
        type : String,
        required : true
    },
    harvestedDate : {
        type : Date,
        required : true
    },
    cropType : {
        type : String,
        required : true
    },
    yieldAmount : {
        type : Number,
        required : true
    },
    unitPrice : {
        type : Number,
        required : true
    }

})

const CropDetails = mongoose.model("CropDetails", cropdetailsSchema);

module.exports = CropDetails;
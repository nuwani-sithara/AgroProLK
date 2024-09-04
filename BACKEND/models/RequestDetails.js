const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requestdetailsSchema = new Schema({

    buyerName : {
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
    requestedCropSize : {
        type : Number,
        required : true
    },
    requestedPrice : {
        type : Number,
        required : true
    }

})

const RequestDetails = mongoose.model("RequestDetails", requestdetailsSchema);
module.exports = RequestDetails;

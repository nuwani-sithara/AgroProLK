const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requestdetailsSchema = new Schema({

    farmerName : {
        type : String,
        required : false
    },
    cropType : {
        type : String,
        required : false
    },
    unitPrice : {
        type : Number,
        required : false
    },
    buyerName : {
        type : String,
        required : true
    },
    email : {
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
    requestedYieldsAmount : {
        type : Number,
        required : true
    },
    requestedPrice : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        required : false
    },
    item_id:{
        type : String,
        required : false

    }

})

const RequestDetails = mongoose.model("RequestDetails", requestdetailsSchema);
module.exports = RequestDetails;

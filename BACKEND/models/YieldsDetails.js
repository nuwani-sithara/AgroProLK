const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const yieldsdetailsSchema = new Schema({

    farmerName : {
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
    amountType : {
        type :String,
        required : true
    },
    unitPrice : {
        type : Number,
        required : true
    }

})

const YieldsDetails = mongoose.model("YieldsDetails", yieldsdetailsSchema);

module.exports = YieldsDetails;
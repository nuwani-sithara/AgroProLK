const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newFertilizerSchema = new Schema({
    fName : {
        type : String,
        required : true
    },
    disName : {
        type : String,
        required : true
    },
    soilColor : {
        type : String,
        required : true
    },
    nitrogen : {
        type : Number,
        required : true
    },
    phosphorus : {
        type : Number,
        required : true
    },
    potassium : {
        type : Number,
        required : true
    },
    pH : {
        type : Number,
        required : true
    },
    rainfall : {
        type : Number,
        required : true
    },
    temperature : {
        type : Number,
        required : true
    },
    crop : {
        type : String,
        required : true
    }
})

const Fertilizer = mongoose.model("Fertilizer",newFertilizerSchema);

module.exports = Fertilizer;
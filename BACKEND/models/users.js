const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name :{
        type : String,
        required : true
    },
    address :{
        type : String,
        required : true
    },
    phoneNumber :{
        type : Number,
        required : true
    },
    email:{
        type : String,
        required : true
    },
    password :{
        type : String,
        required : true
    },
    user_Type:{
        type : String,
        required : false
    }
    
})

const users = mongoose.model("users",userSchema);

module.exports = users;
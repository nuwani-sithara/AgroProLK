const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();


const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    //useCreateIndex: true,
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
    //useFindAndModify: false
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb Connection Success!");
})

const cropdetailsRouter = require("./routes/cropdetails.js");
const requestdetailsRouter = require("./routes/requestdetails.js");

app.use("/cropdetails", cropdetailsRouter);
app.use("/requestdetails", requestdetailsRouter);



app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});


 
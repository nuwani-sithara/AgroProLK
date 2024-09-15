const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newPlaceOrderSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: "users", // Reference to the users model
        required: true
    },
    fertilizerID: {
        type: Schema.Types.ObjectId,
        ref: "Fertilizer", // Reference to the Fertilizer model
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
});

const PlaceOrder = mongoose.model("PlaceOrder", newPlaceOrderSchema);

module.exports = PlaceOrder;

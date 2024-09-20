const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: String,
  orderNumber: String,
  orderId: String,
  product: String,
  quantity: Number,
  totalPrice: Number,
  status: String
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;

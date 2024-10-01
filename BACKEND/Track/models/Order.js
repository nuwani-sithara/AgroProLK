const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  orderNumber: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  product: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'Order Placed',
  },
  createdAt: {
    type: Date,
    default: Date.now,  // Automatically stores the current date and time
  },
  name: {  // New field for name
    type: String,
    default: 'Annesiyani', // Default value for name
  },
  address: {  // New field for address
    type: String,
    default: '40, Malabe, Colombo', // Default value for address
  },
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

module.exports = Order;

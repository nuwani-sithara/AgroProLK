const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Order = require('./Track/models/Order'); // Adjust path if needed

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URL = process.env.MONGODB_URL;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(MONGODB_URL, {})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Stop execution if there's an error
  });


//Route to create a new order
app.post('/api/orders', async (req, res) => {
  const { userId, orderNumber, product, quantity, status, totalPrice } = req.body;

  if (!userId || !orderNumber || !product || !quantity || !status || !totalPrice) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const newOrder = new Order({
      userId,
      orderNumber,
      product,
      quantity,
      status,
      totalPrice
    });

    const savedOrder = await newOrder.save();
    return res.status(201).json(savedOrder); // 201 response on successful creation
  } catch (err) {
    return res.status(500).json({ message: 'Error saving order', error: err.message });
  }
});



// Route to get a single order by ID
app.get('/api/orders/:orderId', async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findOne({ orderId });
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error fetching order:', err });
  }
});

// Route to update order status
app.put('/api/orders/:orderId', async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Status is required.' });
  }

  try {
    const order = await Order.findOneAndUpdate(
      { orderId },
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order status updated', order });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});



// Fertilizer Routes
const fertilizerRouter = require("./routes/newfertilizers.js");
app.use("/fertilizer", fertilizerRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

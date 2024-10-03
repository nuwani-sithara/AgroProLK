const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const usersRoute = require("./routes/users"); // Import the users route
const FertilizerCalculation = require('./models/fertilizerCalculation');
const Notification = require('./Track/models/Notification'); // Import the Notification model
const Order = require('./Track/models/Order'); // Adjust path if needed

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8070;
const MONGODB_URL = process.env.MONGODB_URL;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", usersRoute);

// Connect to MongoDB with Debug Mode enabled
mongoose.set('debug', true); // Enable Mongoose debug mode
mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Route to create a new order with auto-increment
app.post('/api/orders', async (req, res) => {
  const { product, quantity, totalPrice } = req.body;

  try {
    // Find the last order to auto-increment orderNumber and orderId
    const lastOrder = await Order.findOne().sort({ orderId: -1 });

    const orderNumber = lastOrder ? (parseInt(lastOrder.orderNumber) + 1).toString().padStart(3, '0') : '001'; // Starts from '007'
    const orderId = lastOrder ? (parseInt(lastOrder.orderId) + 1) : 1; // Starts from 7

    const newOrder = new Order({
      userId: '1', // Fixed userId
      orderNumber, // Formatted orderNumber (e.g., '007')
      orderId: orderId.toString(), // Convert orderId to string
      product,
      quantity,
      totalPrice,
      createdAt: new Date(),  // Explicitly set the created date and time
      status: 'Order Placed', // Initial status
      name: 'Annesiyani',  // Fixed name value
      address: '40, Malabe, Colombo',  // Fixed address value
    });

    const order = await newOrder.save();
    res.status(201).json(order);
  } catch (err) {
    // Better Error Handling
    console.error('Error saving order:', err.message, err.stack);
    if (err.code === 11000) {
      // Handle Duplicate Key Error
      return res.status(400).json({
        error: 'Duplicate key error: Order number already exists.',
        details: err.keyValue,
      });
    }
    res.status(500).json({ error: 'Error saving order:', details: err.message });
  }
});

// API Routes
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders', error: err.message });
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

    // Create a notification for the user
    const newNotification = new Notification({
      userId: order.userId,
      orderId: order.orderId,
      message: `Your order ${order.orderId} status has been updated to ${status}.`,
    });

    await newNotification.save();

    res.json({ message: 'Order status updated and notification created', order });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Route to get notifications for a user
app.get('/api/notifications/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await Notification.find({ userId });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notifications', error: err.message });
  }
});

// Route to mark notifications as read
app.put('/api/notifications/mark-read/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    await Notification.updateMany({ userId, isRead: false }, { isRead: true });
    res.json({ message: 'All notifications marked as read' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating notifications', error: err.message });
  }
});

// Route to delete all read notifications
app.delete('/api/notifications/delete-read/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    await Notification.deleteMany({ userId, isRead: true });
    res.json({ message: 'All read notifications deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting notifications', error: err.message });
  }
});




// Fertilizer Routes
const fertilizerRouter = require("./routes/newfertilizers.js");
app.use("/fertilizer", fertilizerRouter);

const userRouter = require("./routes/users.js");
app.use("/users",userRouter);
const yieldsdetailsRouter = require("./routes/yieldsdetails.js");
const requestdetailsRouter = require("./routes/requestdetails.js");

app.use("/yieldsdetails", yieldsdetailsRouter);
app.use("/requestdetails", requestdetailsRouter);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let orders = [
  { orderId: '1', product: 'K -40', quantity: 1, status: 'Order Placed' },
  { orderId: '2', product: 'Coated Fertilizer', quantity: 1, status: 'Delivered' },
  { orderId: '3', product: 'Specialized Fertilizer', quantity: 1, status: 'In Production' },
  { orderId: '4', product: 'Urea Fertilizer', quantity: 1, status: 'Shipping Final Mile' },
  { orderId: '5', product: 'K -40', quantity: 1, status: 'In District Office' },
  { orderId: '6', product: 'Coated Fertilizer', quantity: 1, status: 'Delivered' }
];

// Route to get all orders
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// Route to get a single order by ID
app.get('/api/orders/:orderId', (req, res) => {
  const { orderId } = req.params;
  const order = orders.find(o => o.orderId === orderId);
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

// Route to update order status
app.put('/api/orders/:orderId', (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const order = orders.find(o => o.orderId === orderId);
  if (order) {
    order.status = status;
    res.json({ message: 'Order status updated', order });
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

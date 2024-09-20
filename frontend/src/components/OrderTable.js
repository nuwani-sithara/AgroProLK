import React from 'react';
import { Link } from 'react-router-dom';

const tableStyle = {
  borderRadius: '15px',
  overflow: 'hidden',
  border: '1px solid #ccc'
};

const OrderTable = ({ orders }) => {
  return (
    <table className="table table-striped" style={tableStyle}>
      <thead>
  <tr>
    <th>Order ID</th>
    <th>Fertilizer</th>
    <th>Quantity</th>
    <th>Price</th>  {/* New column */}
    <th>Status</th>
    <th>Track Order</th>
  </tr>
</thead>
      <tbody>
        {orders.map(order => (
          <tr key={order.orderId}>
           <td>{order.orderId}</td>
           <td>{order.product}</td>
           <td>{order.quantity}</td>
           <td>{order.totalPrice?.toFixed(2)}</td> {/* Display Total Price */}
           <td>{order.status}</td>
            <td>
              <Link to={`/track/${order.orderId}`} style={{ color: 'hsl(120, 36%, 41%)', textDecoration: 'underline', // Add underline
                  fontWeight: 'bold' }}>Track Order</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;

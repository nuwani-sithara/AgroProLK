import React from 'react';

const AdminOrderTable = ({ orders, onUpdateStatus }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
        <th>Order ID</th>
    <th>Product</th>
    <th>Quantity</th>
    <th>Price</th>  {/* New column */}
    <th>Status</th>
    <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.length > 0 ? (
          orders.map(order => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
      <td>{order.product}</td>
      <td>{order.quantity}</td>
      <td>{order.totalPrice}</td>  {/* New column for price */}
      <td>{order.status}</td>
              <td>
                <button onClick={() => onUpdateStatus(order.orderId)}>Update Status</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5">No orders available.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default AdminOrderTable;

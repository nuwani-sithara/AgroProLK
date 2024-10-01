import React from 'react';

const tableStyle = {
  borderRadius: '10px',
  overflow: 'hidden',
  border: '1px solid #ccc'
};

const AdminOrderTable = ({ orders, onUpdateStatus }) => {
  return (
    <table className="table table-striped" style={tableStyle}>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Customer</th> {/* New column for Name */}
          <th>Address</th> {/* New column for Address */}
          <th>Fertilizer</th>
          <th>Quantity</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.length > 0 ? (
          orders.map(order => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.name || 'Annesiyani'}</td> {/* Display name, fallback to "Annesiyani" */}
              <td>{order.address || '40, Malabe, Colombo'}</td> {/* Display address, fallback to a fixed value */}
              <td>{order.product}</td>
              <td>{order.quantity.toFixed(2)}</td>
              <td>{order.status}</td>
              <td>
                <button
                  onClick={() => onUpdateStatus(order.orderId)}
                  style={{
                    backgroundColor: 'green',
                    color: 'white',
                    border: 'none',
                    padding: '10px',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Update Status
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7">No orders available.</td> {/* Adjusted colspan for the new columns */}
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default AdminOrderTable;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminOrderTable from '../components/AdminOrderTable';

const OrderAdmin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [status, setStatus] = useState('Order Placed');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    axios.get(`${API_URL}/api/orders`)
      .then(response => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
        setError('Failed to load orders.');
        setLoading(false);
      });
  }, [API_URL]);

  const handleUpdateStatus = (orderId) => {
    const order = orders.find(order => order.orderId === orderId);
    if (order) {
      setSelectedOrderId(orderId);
      setStatus(order.status);
      setShowModal(true);
    }
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedOrderId) {
      setMessage('Please select an order.');
      return;
    }

    axios.put(`${API_URL}/api/orders/${selectedOrderId}`, { status })
      .then(() => {
        setMessage('Order status updated successfully.');
        return axios.get(`${API_URL}/api/orders`);
      })
      .then(response => {
        setOrders(response.data);
        setShowModal(false);
      })
      .catch(error => {
        console.error('Error updating order status:', error);
        setMessage('Failed to update order status.');
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4">
      <pre></pre>
      <pre></pre>
      <pre></pre>
      <pre></pre>
      <pre></pre>

      <h2>Manage Orders</h2>
      {orders.length > 0 ? (
        <AdminOrderTable orders={orders} onUpdateStatus={handleUpdateStatus} />
      ) : (
        <p>No orders available.</p>
      )}

      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-labelledby="statusModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header d-flex justify-content-between align-items-center">
                <h5 className="modal-title" id="statusModalLabel">Update Order Status</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                      id="status"
                      className="form-control"
                      value={status}
                      onChange={handleStatusChange}
                      required
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="In Production">In Production</option>
                      <option value="In District Office">In District Office</option>
                      <option value="Shipping Final Mile">Shipping Final Mile</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">Update Status</button>
                </form>
                {message && <p className="mt-3">{message}</p>}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderAdmin;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OrderTable from '../components/OrderTable';
import './OrderList.css';
import axios from 'axios';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/orders')
      .then(response => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
        setError('Failed to load orders.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <pre></pre>
      <pre></pre>
      <pre></pre>
      <pre></pre>
      <pre></pre>
      <pre></pre>
      <pre></pre>
      <h2>My Orders <pre></pre></h2>
      <pre></pre>
      <OrderTable orders={orders} />
      <Link to="/admin/orders" className="admin-link">Go to Admin Orders</Link>
    </div>
  );
};

export default OrderList;

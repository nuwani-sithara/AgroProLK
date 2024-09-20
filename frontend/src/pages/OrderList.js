
import React, { useState, useEffect } from 'react';
//import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';
import OrderTable from '../components/OrderTable';
import './OrderList.css';
import axios from 'axios';



const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);

  const API_URL = 'http://localhost:8070';
  const userId = '1';

  useEffect(() => {
    // Fetch orders
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/orders`);
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    // Fetch notifications
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/notifications/${userId}`);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchOrders();
    fetchNotifications();
  }, [API_URL, userId]);


  // Mark all notifications as read
  const handleMarkAllRead = async () => {
    try {
      await axios.put(`${API_URL}/api/notifications/mark-read/${userId}`);
      setNotifications(notifications.map(n => ({ ...n, isRead: true })));
    } catch (error) {
      console.error('Error marking notifications as read:', error);
    }
  };

  // Automatically mark all as read when opening notifications
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      handleMarkAllRead();  // Mark as read when opening
    }
  };

  const handleDeleteRead = async () => {
    try {
      await axios.delete(`${API_URL}/api/notifications/delete-read/${userId}`);
      setNotifications(notifications.filter(n => !n.isRead));
    } catch (error) {
      console.error('Error deleting read notifications:', error);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;
  

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
      <pre></pre>
      <h2>My Orders</h2>
      <div className="notification-wrapper">
      <i className="fas fa-bell notification-icon" onClick={toggleNotifications}>
  {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
</i>

      </div>
      {showNotifications && (
        <div className="notification-dropdown">
           <i className="fas fa-arrow-left back-icon" onClick={toggleNotifications}></i>
        <button onClick={handleDeleteRead} className="btn btn-danger">Delete all read</button>
        <pre></pre>
        <pre></pre>
        <ul>
          {notifications.map(notification => (
            <li key={notification._id}>
              <i className={`notification-icon fas fa-${notification.icon}`}></i>
              <span className="notification-message">{notification.message}</span>
            </li>
          ))}
        </ul>

      </div>
      
      )}
      <OrderTable orders={orders} />
      <Link to="/admin/orders" className="admin-link">Go to Admin Orders</Link>
    </div>
  );
};

export default OrderList;

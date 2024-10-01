
import React, { useState, useEffect, useRef } from 'react';
//import '@fortawesome/fontawesome-free/css/all.min.css';
import OrderTable from '../components/OrderTable';
import './OrderList.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from 'axios';



const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);

  const API_URL = 'http://localhost:8070';
  const userId = '1';
  const dropdownRef = useRef(null); // Ref for notification dropdown
  const bellIconRef = useRef(null); // Ref for bell icon

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      console.log("Handle outside click event triggered");
  
      // Log the clicked target element for debugging
      console.log("Clicked element:", event.target);
  
      // Check if the click is outside both the dropdown and the bell icon
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        bellIconRef.current &&
        !bellIconRef.current.contains(event.target)
      ) {
        console.log("Clicked outside, closing notifications.");
        setShowNotifications(false);
      } else {
        console.log("Clicked inside the dropdown or bell icon.");
        // Add a log to check which exact element is causing this
        console.log("DropdownRef:", dropdownRef.current);
        console.log("BellIconRef:", bellIconRef.current);
      }
    };
  
    if (showNotifications) {
      console.log("Adding event listener for outside click");
      document.addEventListener('mousedown', handleClickOutside);
    }
  
    return () => {
      console.log("Removing event listener for outside click");
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);
  
  
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
    <>
    <Header/>
    <div className="bg">
    <div className="container mt-4">
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
  <i
    className="bx bxs-bell notification-icon"
    onClick={toggleNotifications}
    ref={bellIconRef}  // Assign ref to the bell icon
  >
    {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
  </i>
</div>

{showNotifications && (
  <div className="notification-dropdown" ref={dropdownRef}> {/* Assign ref to the dropdown */}
    <button onClick={handleDeleteRead} className="btn btn-danger">
      Delete all read
    </button>
    <pre></pre>
    <pre></pre>
    <ul>
      {notifications.map((notification) => (
        <li key={notification._id}>
          <i className={`notification-icon fas fa-${notification.icon}`}></i>
          <span className="notification-message">{notification.message}</span>
        </li>
      ))}
    </ul>
  </div>
)}

      <OrderTable orders={orders} />
      </div>
      <pre></pre>
      <pre></pre>
      <pre></pre>
    </div>
    <Footer/>
    </>
  );
};

export default OrderList;

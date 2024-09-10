import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './OrderTracking.css'; 

const OrderTracking = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/orders/${orderId}`)
      .then(response => {
        setOrder(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching order:', error);
        setError('Failed to load order.');
        setLoading(false);
      });
  }, [orderId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const statuses = ['Order Placed', 'In Production', 'In District Office', 'Shipping Final Mile', 'Delivered'];

  const icons = {
    'Order Placed': 'fa-box',
    'In Production': 'fa-cogs',
    'In District Office': 'fa-building',
    'Shipping Final Mile': 'fa-truck',
    'Delivered': 'fa-check-circle'
  };

  const currentStatusIndex = statuses.indexOf(order.status);

  return (
    <div className="container mt-4">
      <pre></pre>
      <pre></pre>
      <pre></pre>
      <pre></pre>
      <h2>Order Tracking - {order.orderId}</h2>
      <div className="card bg-light shadow-lg border border-dark rounded-lg py-3 px-5 my-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="timeline">
                {statuses.map((status, index) => (
                  <div key={status} className={`timeline-item ${index <= currentStatusIndex ? 'active' : ''}`}>
                    <div className={`timeline-marker ${index <= currentStatusIndex ? 'active' : ''}`}>
                      <i className={`fa ${icons[status]} text-white`}></i>
                    </div>
                    <div className="timeline-content">
                      <h5>{status}</h5>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;

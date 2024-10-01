import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css';
import './OrderTracking.css';
import Header from "../components/Header";
import Footer from "../components/Footer";
=======
//import '@fortawesome/fontawesome-free/css/all.min.css'; 
// import 'bootstrap/dist/css/bootstrap.min.css'; 
import './OrderTracking.css'; 
>>>>>>> e7ddff201e99517085cd8955bca5f05dbb2028fc

const OrderTracking = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8070/api/orders/${orderId}`)
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
    'Order Placed': 'bx bx-package',
    'In Production': 'bx bxs-cog',
    'In District Office': 'bx bxs-buildings',
    'Shipping Final Mile': 'bx bxs-truck',
    'Delivered': 'bx bx-check-circle'
  };

  const currentStatusIndex = statuses.indexOf(order.status);


  // Format the createdAt date
  const formattedOrderDate = new Date(order.createdAt).toLocaleString();

  // Calculate the expected delivery date by adding 7 days to the order date
  const expectedDeliveryDate = new Date(order.createdAt);
  expectedDeliveryDate.setDate(expectedDeliveryDate.getDate() + 7);

  const formattedExpectedDate = expectedDeliveryDate.toLocaleString();

  return (
    <>
      <Header />
      <div className='bg'>
        <div className="container mt-4">
          <pre></pre>
          <pre></pre>
          <pre></pre>
          <pre></pre>
          <pre></pre>
          <pre></pre>
          <h2>Order Tracking - {order.orderId}</h2>

          

          <div className="card bg-light shadow-lg border border-dark rounded-lg py-3 px-5 my-5">
            <div className="container-fluid">
              {/* Display the order date */}
          <div className="text-right text-muted" style={{ fontSize: '16px', marginBottom: '20px', textAlign: 'right' }}
          >
            Order Date & Time: {formattedOrderDate}
          </div>
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
              {/* Display the expected delivery date at the bottom */}
              <div className="text-right text-muted" style={{ fontSize: '16px', marginBottom: '20px', textAlign: 'right' }}
          >
            Expected Delivery Date: {formattedExpectedDate}
          </div>
            </div>
          </div>
        </div>
        <pre></pre>
      </div>
      <Footer />
    </>
  );
};

export default OrderTracking;

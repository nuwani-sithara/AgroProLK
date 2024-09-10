import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import OrderList from './pages/OrderList';
import OrderAdmin from './pages/OrderAdmin';
import OrderTracking from './pages/OrderTracking'; 
import Header from './components/Header';
import Footer from './components/Footer'; // Import Footer component
import './App.css'; 

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/admin/orders" element={<OrderAdmin />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/track/:orderId" element={<OrderTracking />} /> 
          <Route path="/" element={<OrderList />} /> 
        </Routes>
        <Footer /> {/* Add Footer component */}
      </div>
    </Router>
  );
};

export default App;

import React from 'react';
import './App.css'; 
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer'; // Import Footer component
import AddFertilizer from './components/AddFertilizer';
import AllFertilizer from './components/AllFertilizer';
import UpdateFertilizer from './components/UpdatFertilizer';
import UserAllFertilizer from './components/User/UserAllFertilizer';
import FertilizerCalculation from './components/User/FertilizerCalculation';
import OrderList from './pages/OrderList';
import OrderAdmin from './pages/OrderAdmin';
import OrderTracking from './pages/OrderTracking'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/addfertilizer" element={<AddFertilizer/>} />
          <Route path="/allfertilizer" element={<AllFertilizer/>} /> 
          <Route path="/updatefertilizer/:id" element={<UpdateFertilizer />} />
          <Route path="/userallfertilizer" element={<UserAllFertilizer />} />
          <Route path="/fertilizercalculation/:id" element={<FertilizerCalculation />} />
          <Route path="/admin/orders" element={<OrderAdmin />} />
          <Route path="/orders" element={<OrderList />} />
          <Route path="/track/:orderId" element={<OrderTracking />} /> 
          {/* <Route path="/" element={<OrderList />}/> */}
        </Routes>
        <Footer /> {/* Add Footer component */}
      </div>
    </Router>
  );
};

export default App;

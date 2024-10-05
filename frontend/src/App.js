import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import AddUser from './components/AddUser';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import AllUsers from './components/AllUsers';
import HomeAdmin from './components/HomeAdmin';
import AddYieldsDetails from './components/AddYieldsDetails';
import ViewAllYieldsDetails from './components/ViewAllYieldsDetails';
import AllYieldsDetails from './components/AllYieldsDetails';
import RequestYield from './components/RequestYield';
import RequestsManage from './components/RequestsManage';
import UserRequests from './components/UserRequests';
import Marketplace from './components/Marketplace';
import BuyerDashboard from './components/BuyerDashboard';
import SellerDashboard from './components/SellerDashboard';
import UserYields from './components/UserYields';
import SeeRequests from './components/SeeRequests';
import OrderList from './pages/OrderList';
import OrderAdmin from './pages/OrderAdmin';
import OrderTracking from './pages/OrderTracking'; 
import AddFertilizer from './components/AddFertilizer';
import AllFertilizer from './components/AllFertilizer';
import UpdateFertilizer from './components/UpdatFertilizer';
import UserAllFertilizer from './components/User/UserAllFertilizer';
import FertilizerCalculation from './components/User/FertilizerCalculation';
import NewHomeHome from './components/NewHomeHome';


function App() {

  // Use localStorage to persist userEmail
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const handleLoginSuccess = (email) => {
    setUserEmail(email);
    setIsLoggedIn(true);
    
    // Store userEmail and isLoggedIn status in localStorage
    localStorage.setItem('userEmail', email);
    localStorage.setItem('isLoggedIn', 'true');
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    const storedLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (storedEmail && storedLoggedIn) {
      setUserEmail(storedEmail);
      setIsLoggedIn(true);
    }
  }, [isLoggedIn]);


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/AddUser" element={<AddUser />} />
        <Route path="/UserProfile" element={isLoggedIn ? <UserProfile userEmail={userEmail} /> : <Navigate to="/" />} />
        <Route path='/AllUsers' element={isLoggedIn ? <AllUsers userEmail={userEmail} /> : <Navigate to="/" />} />
        <Route path='/HomeAdmin' element={isLoggedIn ? <HomeAdmin userEmail={userEmail} /> : <Navigate to="/" />} />
        <Route path='/add-yieldsdetails' element={isLoggedIn ? <AddYieldsDetails userEmail={userEmail} /> : <Navigate to="/" />} />
        <Route path='/view-yieldsdetails' element={isLoggedIn ? <AllYieldsDetails userEmail={userEmail} /> : <Navigate to="/" />} />
        <Route path='/view-allyieldsdetails' element={isLoggedIn ? <ViewAllYieldsDetails userEmail={userEmail} /> : <Navigate to="/" />} />
        <Route path="/request-yield" element={isLoggedIn ? <RequestYield userEmail={userEmail} /> : <Navigate to="/" />} />
        <Route path='/requests-manage' element={isLoggedIn ? <RequestsManage userEmail={userEmail} /> : <Navigate to="/" />} />
        <Route path='/user-requests' element={isLoggedIn ? <UserRequests userEmail={userEmail} /> : <Navigate to="/" />} />
        <Route path='/market' element={isLoggedIn ? <Marketplace userEmail={userEmail} /> : <Navigate to="/" />} />
        <Route path='/buyer-dashboard' element={isLoggedIn ? <BuyerDashboard userEmail={userEmail} /> : <Navigate to="/" />} />
        <Route path='/seller-dashboard' element={isLoggedIn ? <SellerDashboard userEmail={userEmail} /> : <Navigate to="/" />} />
        <Route path='/user-yields' element={isLoggedIn ? <UserYields userEmail={userEmail} /> : <Navigate to="/" />} />
        <Route path='/see-requests' element={isLoggedIn ? <SeeRequests userEmail={userEmail} /> : <Navigate to="/" />} />
        <Route path="/admin/orders" element={isLoggedIn ? <OrderAdmin userEmail={userEmail} /> :  <Navigate to="/" /> } />
        <Route path="/orders" element={isLoggedIn ? <OrderList userEmail={userEmail} /> :  <Navigate to="/" />} />
        <Route path="/track/:orderId" element={isLoggedIn ? <OrderTracking userEmail={userEmail} /> :  <Navigate to="/" />} /> 
        <Route path="/addfertilizer" element={isLoggedIn ? <AddFertilizer userEmail={userEmail} /> :  <Navigate to="/" />} />
        <Route path="/allfertilizer" element={isLoggedIn ? <AllFertilizer userEmail={userEmail} /> :  <Navigate to="/" />} /> 
        <Route path="/updatefertilizer/:id" element={isLoggedIn ? <UpdateFertilizer userEmail={userEmail} /> :  <Navigate to="/" />} />
        <Route path="/userallfertilizer" element={isLoggedIn ? <UserAllFertilizer userEmail={userEmail} /> :  <Navigate to="/" />} />
        <Route path="/fertilizercalculation/:id" element={isLoggedIn ? <FertilizerCalculation userEmail={userEmail} /> :  <Navigate to="/" />} />
        <Route path='/newhome' element={isLoggedIn ? <NewHomeHome userEmail={userEmail} /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

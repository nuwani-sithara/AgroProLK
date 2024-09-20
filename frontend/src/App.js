import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
//import '@fortawesome/fontawesome-free/css/all.min.css';

import AddUser from './components/AddUser';
import UserHome from './components/UserHome';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import AllUsers from './components/AllUsers';
import AdminHome from './components/AdminHome';
import AddYieldsDetails from './components/AddYieldsDetails';
import FarmerHome from './components/FarmerHome';
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


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const handleLoginSuccess = () => {
    // Set isLoggedIn to true and save it to localStorage
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

 

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (storedLoggedIn !== isLoggedIn) {
      setIsLoggedIn(storedLoggedIn);
    }
  }, []);

  return (
    <Router>

      <Routes>
        <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/AddUser" element={<AddUser />} />
        <Route path="/UserHome" element={isLoggedIn ? <UserHome /> : <Navigate to="/" />} />
        <Route path="/UserProfile" element={isLoggedIn ? <UserProfile /> : <Navigate to="/" />} />
        <Route path='/AllUsers' element={isLoggedIn ? <AllUsers /> : <Navigate to="/" />} />
        <Route path='/AdminHome' element={isLoggedIn ? <AdminHome /> : <Navigate to="/" />} />

        <Route path='/home' element={isLoggedIn ? <FarmerHome /> : <Navigate to="/" />} />
        <Route path='/add-yieldsdetails' element={isLoggedIn ? <AddYieldsDetails /> : <Navigate to="/" />} />
        <Route path='/view-yieldsdetails' element={isLoggedIn ? <AllYieldsDetails /> : <Navigate to="/" />} />
        <Route path='/view-allyieldsdetails' element={isLoggedIn ? <ViewAllYieldsDetails /> : <Navigate to="/" />} />
        <Route path="/request-yield" element={isLoggedIn ? <RequestYield /> : <Navigate to="/" />} />
        <Route path='/requests-manage' element={isLoggedIn ? <RequestsManage /> : <Navigate to="/" />} />
        <Route path='/user-requests' element={isLoggedIn ? <UserRequests /> : <Navigate to="/" />} />
        <Route path='/market' element={isLoggedIn ? <Marketplace /> : <Navigate to="/" />} />
        <Route path='/buyer-dashboard' element={isLoggedIn ? <BuyerDashboard /> : <Navigate to="/" />} />
        <Route path='/seller-dashboard' element={isLoggedIn ? <SellerDashboard /> : <Navigate to="/" />} />
        <Route path='/user-yields' element={isLoggedIn ? <UserYields /> : <Navigate to="/" />} />
        <Route path='/see-requests' element={isLoggedIn ? <SeeRequests /> : <Navigate to="/" />} />

        <Route path="/admin/orders" element={isLoggedIn ? <OrderAdmin /> :  <Navigate to="/" /> } />
        <Route path="/orders" element={isLoggedIn ? <OrderList /> :  <Navigate to="/" />} />
        <Route path="/track/:orderId" element={isLoggedIn ? <OrderTracking /> :  <Navigate to="/" />} /> 
        <Route path="/addfertilizer" element={isLoggedIn ? <AddFertilizer/> :  <Navigate to="/" />} />
        <Route path="/allfertilizer" element={isLoggedIn ? <AllFertilizer/> :  <Navigate to="/" />} /> 
        <Route path="/updatefertilizer/:id" element={isLoggedIn ? <UpdateFertilizer /> :  <Navigate to="/" />} />
        <Route path="/userallfertilizer" element={isLoggedIn ? <UserAllFertilizer /> :  <Navigate to="/" />} />
        <Route path="/fertilizercalculation/:id" element={isLoggedIn ? <FertilizerCalculation /> :  <Navigate to="/" />} />







      </Routes>
    </Router>
    

  

  );
};

export default App;

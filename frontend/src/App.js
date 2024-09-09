import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
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


      </Routes>
    </Router>
    
  );
}

export default App;

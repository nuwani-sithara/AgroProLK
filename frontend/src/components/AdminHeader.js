import React, { useState, useEffect } from "react";
import "./styles/Header.css";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import Link and useNavigate

function AdminHeader() {
    const { state } = useLocation();
    const userEmail = state?.userEmail;
    console.log(userEmail);

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const navigate = useNavigate(); // Initialize navigate

    const handleLogout = () => {
        // Set isLoggedIn to false and remove it from localStorage
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        navigate('/'); // Navigate to the home page on logout
    };

    // Check if the user is logged in when the component mounts
    useEffect(() => {
        const storedLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (storedLoggedIn !== isLoggedIn) {
            setIsLoggedIn(storedLoggedIn);
        }
    }, [isLoggedIn]);

    return (
        <div>
            <nav>
                <a className="logo"><span>AgroProLK</span></a>

                <ul>
                    <li><Link to="/AdminHome">Home</Link></li>
                    <li><Link to="/AllUsers">All Users</Link></li>
                    <li><Link to="/xxxx">xxxx</Link></li>
                    <li><Link to="/xxxx">xxxx</Link></li>
                    <li><Link to="/UserProfile" state={{ userEmail }}>Profile</Link></li>
                    {isLoggedIn && (
                        <li><Link to="/" onClick={handleLogout} className="btn btn-danger">Logout</Link></li>
                    )}
                </ul>

                <i className='bx bx-menu-alt-right' id="menu"></i>
            </nav>
        </div>
    );
}

export default AdminHeader;

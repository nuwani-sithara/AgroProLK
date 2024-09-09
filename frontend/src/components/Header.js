import React, { useState, useEffect } from "react";
import "./styles/Header.css";
import { Link, useLocation } from "react-router-dom"; 


function Header(){
    const {state} = useLocation();
    const userEmail = state?.userEmail;
    console.log(userEmail);

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

    const handleLogout = () => {
        // Set isLoggedIn to false and remove it from localStorage
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
    };

    // Check if the user is logged in when the component mounts
    useEffect(() => {
        const storedLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (storedLoggedIn !== isLoggedIn) {
            setIsLoggedIn(storedLoggedIn);
        }
    }, []);


    return(
        
        <div>
            <nav>
                <a href="#" className="logo"><span>AgroProLK</span></a>

                <ul>
                    <li><Link to="/UserHome">Home</Link></li>
                    <li><Link to="">xxxx</Link></li>
                    <li><Link to="/xxxx">xxxx</Link></li>
                    <li><Link to="/xxxx">xxxx</Link></li>
                    <li><Link to="/UserProfile" state={{ userEmail }}>Profile</Link></li>
                    {isLoggedIn && (
                            <a href="/" onClick={handleLogout} className="btn btn-danger">Logout</a>
                        )}

                </ul>

                <i className='bx bx-menu-alt-right' id="menu"></i>

            </nav>
        </div>
    )
}

export default Header;
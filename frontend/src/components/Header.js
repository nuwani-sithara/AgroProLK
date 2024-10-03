import React, { useState, useEffect } from "react";
import "./styles/Header.css";
import { Link, useLocation } from "react-router-dom"; 


function Header(){
    const {state} = useLocation();
    const userEmail = state?.userEmail;
    console.log(userEmail);

    const item_id = state?.item_id;
    console.log(item_id);

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
    }, [isLoggedIn]);


    return(
        
        <div>
            <nav>
            <a href="/" className="logo"><span>AgroProLK</span></a>

                <ul>
                    <li><Link to="/newhome" state={{ userEmail }}>Home</Link></li>
                    <li><Link to="/userallfertilizer" state={{ userEmail }}>Order Fertilizer</Link></li>
                    <li><Link to="/orders" state={{ userEmail }}>Tracking Order</Link></li>
                    <li><Link to="/market" state={{ userEmail, item_id }}>Marketplace</Link></li>
                    <li><Link to="/UserProfile" state={{ userEmail }}>Profile</Link></li>
                    {isLoggedIn && (
                             <li> <button className="bt1"><Link to="/" onClick={handleLogout} >Logout</Link></button></li>
                        )}

                </ul>

                <i className='bx bx-menu-alt-right' id="menu"></i>

            </nav>

        </div>
    )
}


export default Header;


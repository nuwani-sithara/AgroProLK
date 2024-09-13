import React from "react";
import "./Header.css";
import { Link } from "react-router-dom"; 


function Header() {
    return (
        <div>
            <nav>
                <Link to="/" className="logo"><span>AgroProLK</span></Link>

                <ul>
                    <a href="/">Home</a>
                    <a href="/allfertilizer">Fertilizers</a>
                    {/* <a href="/userallfertilizer">UserFertilizers</a> */}
                    <a href="#services">Tracking Details</a>
                    <a href="/add-yieldsdetails">Sell Yields</a>
                    <a href="#contact">Profile</a>    
                </ul>

                <i className='bx bx-menu-alt-right' id="menu"></i>
            </nav>
        </div>
    );
}

export default Header;


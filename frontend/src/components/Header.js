import React from "react";
import "./Header.css";
import { Link } from "react-router-dom"; 

function Header() {
    return (
        <div>
            <nav>
                <Link to="/" className="logo"><span>AgroProLK</span></Link>

                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><a href="#fertilizers">Fertilizers</a></li>
                    <li><a href="#services">Tracking Details</a></li>
                    <li><a href="/add-yieldsdetails">Sell Yields</a></li>
                    <li><a href="#contact">Profile</a></li>
                </ul>

                <i className='bx bx-menu-alt-right' id="menu"></i>
            </nav>
        </div>
    );
}

export default Header;

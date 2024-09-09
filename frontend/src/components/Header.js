import React from "react";
import "./Header.css";
import { Link } from "react-router-dom"; 


function Header(){
    return(
        <div>
            <body>
            <nav>
                <a href="#" className="logo"><span>AgroProLK</span></a>

                <ul>
                    <a href="/">Home</a>
                    <a href="/allfertilizer">Fertilizers</a>
                    <a href="/userallfertilizer">UserFertilizers</a>
                    <a href="#services">Tracking Details</a>
                    <a href="#add-yieldsdetails">Sell Yields</a>
                    <a href="#contact">Profile</a>
                </ul>

                <i className='bx bx-menu-alt-right' id="menu"></i>

            </nav>

            </body>
        </div>
    )
}

export default Header;         
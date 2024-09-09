import React from "react";
import "./styles/Header.css";
import { Link } from "react-router-dom"; 


function Header(){
    return(
        <div>
            <body>
            <nav>
                <a href="#" className="logo"><span>AgroProLK</span></a>

                <ul>
                    <a href="/home">Home</a>
                    <a href="#fertilizers">Fertilizers</a>
                    <a href="#services">Tracking Details</a>
                    <a href="/add-yieldsdetails">Sell Yields</a>
                    <a href="#contact">Profile</a>

                </ul>

                <i className='bx bx-menu-alt-right' id="menu"></i>

            </nav>

            </body>
        </div>
    )
}

export default Header;
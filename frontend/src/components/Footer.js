import React from "react";
import "./styles/Footer.css";

export default function Footer(){
    return(
        <div>
             <div className="body2">

            </div>
            <footer>
            <div class="col-left">
                <div class="col-box">
                    <span><i class='bx bxs-location-plus' ></i></span>
                    <span>Malabe, Sri Lanka</span>
                </div>

                <div class="col-box">
                    <span><i class='bx bxs-phone' ></i></span>
                    <span>+94 XX XXX XXXX</span>
                </div>

                <div class="col-box">
                    <span><i class='bx bxs-envelope' ></i></span>
                    <span>agroprolk@gmail.com</span>
                </div>

            </div>
            <div class="col-right">
                <span>About Our Services</span>
                <p>.....................................................
                    ................................................
                    ..............................................</p>

            </div>
            <div class="col-right">
                <span>About Our Services</span>
                <p>.....................................................
                    ................................................
                    ..............................................</p>

            </div>
        </footer>
        <div className="footer-bottom">
        <p>&copy; 2024 AgroProLK. All rights reserved.</p>
        </div>
        </div>
    )
}
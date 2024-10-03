import React from "react";
import "./styles/Marketplace.css";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import sellimg1 from './images/sellimg1.png';
import sellimg2 from './images/sellimg2.png';


export default function Marketplace() {

    const { state } = useLocation();
    const userEmail = state?.userEmail;
    console.log(userEmail);

    const item_id = state?.item_id;
    console.log(item_id);

    const navigate = useNavigate();

    function handleSeller(){
        navigate("/seller-dashboard",  {state: {userEmail, item_id}});
    }

    function handleBuyer(){
        navigate("/buyer-dashboard", {state: {userEmail, item_id}});
    }


    return(
        <><><Header /><div style={{marginTop:"20vh", marginBottom:"10vh"}} className="market">

            <div className="container">
                <div className="work-list">

                    <div>
                        <h1 className="top">Click below to be a Seller</h1>
                    <div className="work">
                    <img className="img" src={sellimg1} alt="sellyeild" />
                        <div className="layer">
                            <h3><span>Be a Seller</span></h3>
                            <p>You can sell your own yields very easily and protectively
                            </p>
                            <button className="btn12" onClick={handleSeller}>
                            <span><i class='bx bxs-chevrons-right'></i></span>
                            </button>
                        </div>
                    </div>
                    </div>

                    <div>
                        <h1 className="top">Click below to be a Buyer!</h1>
                    <div className="work">
                    <img className="img" src={sellimg2} alt="buyyield" />
                        <div className="layer">
                            <h3><span>Be a Buyer</span></h3>
                            <p>You can buy others yields very easily and seamlessly
                            </p>
                            <button className="btn12" onClick={handleBuyer}>
                            <span><i class='bx bxs-chevrons-right'></i></span>
                            </button>                        
                        </div>
                    </div>
                    </div>
                </div>
            </div>

        </div></><Footer /></>
    )
}
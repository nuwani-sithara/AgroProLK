import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./styles/BuyerDashboard.css";
import "./images/sellimg2.png";
import { useNavigate, useLocation } from "react-router-dom";



export default function BuyerDashboard() {

    const { state } = useLocation();
    const userEmail = state?.userEmail;
    console.log(userEmail);

    const item_id = state?.item_id;
    console.log(item_id);

    const navigate = useNavigate();

    function handleNavigate() {
        // Correctly use navigate here
        navigate("/view-allyieldsdetails", { state: { userEmail } });
    }

    function handleNavigate2(){
        navigate("/user-requests", {state: {userEmail, item_id}});
    }

    

    return(
        <><><Header />
        <h1 className="hstyle">Welcome back Buyers!!</h1>
            <div className="dash2">
                
                <div className="row">
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Marketplace</h5>
                                    <p className="card-text">"Find Fresh Yields! Browse and request the best produce directly from trusted sellers. Buy fresh, buy local!"</p>
                                    
                                    <button className="bttn1" onClick={handleNavigate}>
                                        Buy Other Yields
                                    </button>
                                    <button className="bttn1" onClick={handleNavigate2}>
                                        Your Requests
                                    </button>
                                </div>
                            </div>
                        </div>
            </div>
        </div></><Footer /></>
    )
}
import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./styles/BuyerDashboard.css";
import { Link, useNavigate, useLocation } from "react-router-dom";



export default function SellerDashboard() {
    const { state } = useLocation();
    const userEmail = state?.userEmail;
    console.log(userEmail);

    const item_id = state?.item_id;
    console.log(item_id);

    const navigate = useNavigate();

    function handleNavigate3(){
        navigate("/add-yieldsdetails", {state: {userEmail}});
    }

    function handleNavigate2(){
        navigate("/user-yields", {state: {userEmail, item_id}});
    }

    // function handleNavigate4(){
    //     navigate("/see-requests", {state: { item_id}});
    // }


    return(
        <><><Header />
            <div className="dash2">
                <h1 className="hstyle">Welcome back Sellers!!</h1>
                <div className="row">
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Marketplace</h5>
                                    <p className="card-text">View, edit, and process payments.</p>
                                    <button className="bttn1" onClick={handleNavigate3}>
                                    Add Your Yields
                                    </button>
                                    <button className="bttn1" onClick={handleNavigate2}>
                                    Manage Your Yields
                                    </button>
                                    {/* <button className="bttn1" onClick={handleNavigate4}>
                                    See Requests
                                    </button> */}
                                   
                                </div>
                            </div>
                        </div>
            </div>
        </div></><Footer /></>
    )
}
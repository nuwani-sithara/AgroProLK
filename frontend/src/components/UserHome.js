import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./styles/UserHome.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function UserHome() {
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

    function handleNavigate3(){
        navigate("/add-yieldsdetails", {state: {userEmail}});
    }

    function handleNavigate4(){
        navigate("/user-yields", {state: {userEmail}});
    }

    return (
        <>
            <div>
                <Header />
            </div>
            <div className="bg">
                <div className="container mt-4">
                    <div className="row1">
                        <div className="col-lg-12">
                            <div className="p-3 mb-2 bg-secondary-subtle text-secondary-emphasis">
                                <h1 className="display-3">AgroProLK</h1>
                                <figure className="text-end">
                                    <blockquote className="blockquote">
                                        <p>The most important part of any payment system is trust.</p>
                                    </blockquote>
                                    <figcaption className="blockquote-footer">
                                        Patrick Collison <cite title="Source Title">CEO of Stripe</cite>
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Marketplace</h5>
                                    <p className="card-text">View, edit, and process payments.</p>
                                    <button className="btn btn-outline-primary" onClick={handleNavigate3}>
                                    Sell Your Yields
                                    </button>
                                    <button className="btn btn-outline-primary" onClick={handleNavigate}>
                                        Buy Other Yields
                                    </button>
                                    <button className="btn btn-outline-primary" onClick={handleNavigate2}>
                                        Your Requests
                                    </button>
                                    <button className="btn btn-outline-primary" onClick={handleNavigate4}>
                                        Your Yields
                                    </button>
                                </div>
                            </div>
                        </div>
                        <br />
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Manage Payment Reports</h5>
                                    <p className="card-text">View, edit and add payment reports</p>
                                    <Link to="/allreports" className="btn btn-outline-primary">Go to Payment Reports</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Fertilizers</h5>
                                    <p className="card-text">Calculate, view, edit, remove driver payments</p>
                                    <Link to="/alldriverpayments" className="btn btn-outline-primary">Order Fertilizers</Link>
                                    <Link to="/adddriverpayment" className="btn btn-outline-secondary">Track Your Order</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <br />
            </div>
            <Footer />
        </>
    );
}

import React,{useState} from "react";
import Footer from "./Footer";
import "./styles/UserHome.css";
import { Link, Route, useLocation } from "react-router-dom";
import AdminHeader from "./AdminHeader"

export default function AdminHome(){

    const {state} = useLocation();
    const userEmail = state?.userEmail;
    console.log(userEmail);

    return(
        <><><div>
            <AdminHeader/>


        </div><div className="bg">

                <div className="container">
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
                    <br/>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Marketplace</h5>
                                    <p className="card-text">View, edit, and process payments.</p>
                                    <Link to="/add-yieldsdetails" className="btn btn-outline-primary">Sell Your Yields</Link>
                                    <Link to="/view-allyieldsdetails" className="btn btn-outline-primary">Buy Other Yields</Link>
                                </div>
                            </div>
                        </div>
                        <br/>
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
                <br/>
                <br/>

            </div></><Footer /></>
        
    )
}
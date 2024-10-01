import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./styles/FarmerHome.css";
import { Link} from "react-router-dom";

export default function FarmerHome(){
    return(
        <><><div>
            <Header />


        </div><div className="bg">

                <div className="container">
                    <div className="row1">
                        <div className="col-lg-12">
                            <div className="p-3 mb-2 bg-secondary-subtle text-secondary-emphasis">
                                <h1 className="display-3">AgroProLK</h1>
                                <figure className="text-end">
                                    {/* <blockquote className="blockquote">
                                        <p>The most important part of any payment system is trust.</p>
                                    </blockquote>
                                    <figcaption className="blockquote-footer">
                                        Patrick Collison <cite title="Source Title">CEO of Stripe</cite>
                                    </figcaption> */}
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
                                    <p className="card-text">Farmers can add their yields details and buy other's yields</p>
                                    <Link to="/add-yieldsdetails" className="btn btn-outline-primary">Sell Your Yields</Link>
                                    <Link to="/view-allyieldsdetails" className="btn btn-outline-primary">Buy Other Yields</Link>
                                    <Link to="/user-requests" className="btn btn-outline-primary">See Your Requests</Link>

                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Manage Yields</h5>
                                    <p className="card-text">Admin can View, edit and check Yields details</p>
                                    <Link to="/view-yieldsdetails" className="btn btn-outline-primary">Manage Yields Details</Link>
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
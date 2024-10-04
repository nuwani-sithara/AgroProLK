import React from "react";
import AdminHeader from "./AdminHeader";
import Footer from "./Footer";
import "./styles/HomeAdmin.css";
import { Link } from 'react-router-dom';

function AdminHome() {

    
    return (
        <>
           <AdminHeader/>
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero-section1">
                <div className="hero-content">
                    <h1>Welcome to AgroProLK</h1>
                  <br/> <h1>Admin.....</h1>
                    <p>Empowering Sri Lankan Farmers with Technology</p>
                    <Link to="/evaluate-service" className="cta-btn">
                            Evaluate Our Service Capabilities
                        </Link>
                </div>
            </section>

            <section className="stats-section">
                <div className="stats-box">
                    <h3>500+</h3>
                    <p>Total Users</p>
                </div>
                <div className="stats-box">
                    <h3>120+</h3>
                    <p>Active Farmers</p>
                </div>
                <div className="stats-box">
                    <h3>1000+</h3>
                    <p>Orders Processed</p>
                </div>
                <div className="stats-box">
                    <h3>50+</h3>
                    <p>Feedback Received</p>
                </div>
            </section>

            <section className="features-section">
                <h2>Recent Activities</h2>
               
                <div className="feature-boxes">
                    <div className="feature-box">
                            <i className="bx bx-user-plus"></i><br/><br/>
                            <h4>User John Doe registered.</h4><br/> 
                            <p>User John Doe has registered. 
                            Please verify his account details and send a welcome email.</p>
                                 
                    </div>

                    <div className="feature-box">
                        <i className="bx bx-message-square-detail"></i><br/><br/>
                        <h4> Feedback from Kamala was received.</h4><br/>
                        <p>Feedback from Kamala has been received. Review her comments for service improvement.</p>
                    </div>

                    <div className="feature-box">
                        <i className="bx bx-add-to-queue"></i><br/><br/>
                        <h4> New product "NPK Fertilizer" added.</h4><br/>
                        <p>'NPK Fertilizer' has been added. Update listings and marketing materials.</p>
                    </div>

                    <div className="feature-box">
                        <i className="bx bx-shopping-bag"></i><br/><br/>
                        <h4> Order #12345 was processed.</h4><br/>
                        <p>Order #12345 has been processed. Check the details and ensure shipping arrangements.</p>
                    </div>
                </div>
            </section>

            <section className="cta-section">
                         <h2>Actions</h2>
                         <p>What would you like to do next?</p>
                         <Link to="/AllUsers" className="cta-btn">
                             Manage Users
                         </Link>
                         <Link to="/allfertilizer" className="cta-btn">
                             Manage Fertilizers
                         </Link>
                         <Link to="/admin/orders" className="cta-btn">
                             Manage Orders
                         </Link>
                         <Link to="/view-yieldsdetails" className="cta-btn">
                            Manage Yields
                         </Link>
                         <Link to="/requests-manage" className="cta-btn">
                            Manage Request
                         </Link>
                     </section>
        </div>
        <Footer/>
        </>
    );
}

export default AdminHome;



// //import React,{useState} from "react";
// import Footer from "./Footer";
// import "./styles/HomeAdmin.css";
// //import UserRequests from "./UserRequests";
// import { Link, useLocation } from "react-router-dom";
// import AdminHeader from "./AdminHeader"


// export default function AdminHome(){

//     const {state} = useLocation();
//     const userEmail = state?.userEmail;
//     console.log(userEmail);



//     return(
//         <><><div>
//             <AdminHeader />
//         </div>
//         <div className="bg">

//                 {/* <div className="container"> */}
//                     <div className="row1">
//                         <div className="col-lg-12">
//                             <div className="dv-space">
//                                 <h1 className="display-3">AgroProLK</h1>
//                                 <figure className="text-end">
//                                     <blockquote className="blockquote">
//                                         <p>The most important part of any payment system is trust.</p>
//                                     </blockquote>
//                                     <figcaption className="blockquote-footer">
//                                         Patrick Collison <cite title="Source Title">CEO of Stripe</cite>
//                                     </figcaption>
//                                 </figure>
//                             </div>
//                         </div>
//                     {/* </div> */}
//                     </div><div className="container">
//                     <div className="row">
//                         <div className="col-lg-6">
//                             <div className="card">
//                                 <div className="card-body">
//                                     <h5 className="card-title">Marketplace</h5>
//                                     <p className="card-text">View, edit, and process payments.</p>
//                                     <Link to="/view-yieldsdetails" className="btn btn-outline-primary">Manage Yields</Link>
//                                     <Link to="/requests-manage" className="btn btn-outline-primary">Manage Requests</Link>
//                                 </div>
//                             </div>
//                         </div>
//                         <br/>
//                         <div className="col-lg-6">
//                             <div className="card">
//                                 <div className="card-body">
//                                     <h5 className="card-title">Manage Users</h5>
//                                     <p className="card-text">View, edit and delete users</p>
//                                     <Link to="/AllUsers" className="btn btn-outline-primary">Go to User Management</Link>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="col-lg-6">
//                             <div className="card">
//                                 <div className="card-body">
//                                     <h5 className="card-title">Fertilizers</h5>
//                                     <p className="card-text">Calculate, view, edit, remove driver payments</p>
//                                     <Link to="/allfertilizer" className="btn btn-outline-primary">Manage Fertilizers</Link>
//                                     <Link to="/adddriverpayment" className="btn btn-outline-primary">Track Your Order</Link>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <br/>
//                 <br/>

//             </div></><Footer /></>
        
//     )
// }



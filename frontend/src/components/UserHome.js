// import React from "react";
// import Header from "./Header";
// import Footer from "./Footer";
// import "./styles/UserHome.css";
// import { Link, useNavigate, useLocation } from "react-router-dom";

// export default function UserHome() {
//     const { state } = useLocation();
//     const userEmail = state?.userEmail;
//     const item_id = state?.item_id;

//     const navigate = useNavigate();

//     // Define navigation functions
//     function navigateToAddYieldsDetails() {
//         navigate("/add-yieldsdetails", { state: { userEmail } });
//     }

//     function navigateToViewAllYieldsDetails() {
//         navigate("/view-allyieldsdetails", { state: { userEmail } });
//     }

//     function navigateToUserRequests() {
//         navigate("/user-requests", { state: { userEmail, item_id } });
//     }

//     function navigateToUserYields() {
//         navigate("/user-yields", { state: { userEmail } });
//     }

//     return (
//         <>
//             <Header />
//             <div className="bg">
//                 <div className="container mt-4">
//                     <div style={{ marginTop: "15vh" }} className="bg">
//                         <div className="container">
//                             <div className="row1">
//                                 <div className="col-lg-12">
//                                     <div className="p-3 mb-2 bg-secondary-subtle text-secondary-emphasis">
//                                         <h1 className="display-3">AgroProLK</h1>
//                                         <figure className="text-end">
//                                             <blockquote className="blockquote">
//                                                 <p>The most important part of any payment system is trust.</p>
//                                             </blockquote>
//                                             <figcaption className="blockquote-footer">
//                                                 Patrick Collison <cite title="Source Title">CEO of Stripe</cite>
//                                             </figcaption>
//                                         </figure>
//                                     </div>
//                                 </div>
//                             </div>
//                             <br />
//                             <div className="row">
//                                 <div className="col-lg-6">
//                                     <div className="card">
//                                         <div className="card-body">
//                                             <h5 className="card-title">Marketplace</h5>
//                                             <p className="card-text">View, edit, and process payments.</p>
//                                             <button style={{ width: "20vw" }} className="btn btn-outline-primary" onClick={navigateToAddYieldsDetails}>
//                                                 Sell Your Yields
//                                             </button>
//                                             <button style={{ width: "20vw" }} className="btn btn-outline-primary" onClick={navigateToViewAllYieldsDetails}>
//                                                 Buy Other Yields
//                                             </button>
//                                             <button style={{ width: "20vw" }} className="btn btn-outline-primary" onClick={navigateToUserRequests}>
//                                                 Your Requests
//                                             </button>
//                                             <button style={{ width: "20vw" }} className="btn btn-outline-primary" onClick={navigateToUserYields}>
//                                                 Your Yields
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <br />
//                                 <div className="col-lg-6">
//                                     <div className="card">
//                                         <div className="card-body">
//                                             <h5 className="card-title">Manage Payment Reports</h5>
//                                             <p className="card-text">View, edit and add payment reports</p>
//                                             <Link to="/allreports" className="btn btn-outline-primary" style={{ width: "20vw" }}>Go to Payment Reports</Link>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-lg-6">
//                                     <div className="card">
//                                         <div className="card-body">
//                                             <h5 className="card-title">Fertilizers</h5>
//                                             <p className="card-text">Calculate, view, edit, remove driver payments</p>
//                                             <Link to="/alldriverpayments" className="btn btn-outline-primary" style={{ width: "20vw" }}>Order Fertilizers</Link>
//                                             <Link to="/adddriverpayment" className="btn btn-outline-secondary" style={{ width: "20vw" }}>Track Your Order</Link>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <br />
//                         <br />
//                     </div>
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// }

import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./styles/UserHome.css";


function UserHome() {

    
    return (
        <>
            <Header />
        <div className="home-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to AgroProLK</h1>
                    <p>Empowering Sri Lankan Farmers with Technology</p>
                    <button className="cta-btn">Explore Our Services</button>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <h2>Our Core Features</h2>
                <p>Discover how AgroProLK can revolutionize your farming practices</p>
                <div className="feature-boxes">
                    <div className="feature-box">
                        <i className="bx bxs-leaf"></i>
                        <h3>Fertilizer Management</h3>
                        <p>Get personalized fertilizer recommendations based on crop and soil analysis.</p>
                    </div>

                    <div className="feature-box">
                        <i className="bx bxs-truck"></i>
                        <h3>Timely Delivery</h3>
                        <p>Reliable and efficient delivery of fertilizer right to your farm gate.</p>
                    </div>

                    <div className="feature-box">
                        <i className="bx bxs-bar-chart-alt-2"></i>
                        <h3>Track Your Yield</h3>
                        <p>Utilize modern tools to monitor your farm's yield and track performance.</p>
                    </div>

                    <div className="feature-box">
                        <i className="bx bxs-store"></i>
                        <h3>Sell Your Harvest</h3>
                        <p>Seamlessly connect with buyers, maximizing your profit potential.</p>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="stats-section">
                <div className="stats-box">
                    <h3>50K+</h3>
                    <p>Farmers Helped</p>
                </div>
                <div className="stats-box">
                    <h3>10K+</h3>
                    <p>Deliveries Completed</p>
                </div>
                <div className="stats-box">
                    <h3>1M+</h3>
                    <p>Tons of Fertilizer Supplied</p>
                </div>
                <div className="stats-box">
                    <h3>500+</h3>
                    <p>Active Partners</p>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonial-section">
                <h2>What Our Farmers Say</h2>
                <div className="testimonials">
                    <div className="testimonial-box">
                        <p>"AgroProLK has transformed my farm's productivity. Their recommendations are spot on, and I always receive my deliveries on time!"</p>
                        <h4>- Ruwan, Farmer from Kandy</h4>
                    </div>
                    <div className="testimonial-box">
                        <p>"Selling my harvest has never been easier. AgroProLK's platform connects me with reliable buyers, maximizing my profits."</p>
                        <h4>- Kamala, Farmer from Anuradhapura</h4>
                    </div>
                    <div className="testimonial-box">
                        <p>"Tracking my yield has become so efficient. I can now monitor my farm’s performance and improve where necessary."</p>
                        <h4>- Saman, Farmer from Polonnaruwa</h4>
                    </div>
                   
                </div>
            </section>

            {/* Call-to-Action Section */}
            <section className="cta-section">
                <h2>Join the Agricultural Revolution</h2>
                <p>Take your farming business to new heights with AgroProLK.</p>
                <button className="cta-btn-secondary">Get Started Now</button>
            </section>
        </div>
        <Footer/>
        </>
    );
}

export default UserHome;
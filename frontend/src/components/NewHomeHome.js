import React from "react";
import "./NewHomeHome.css";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from 'react-router-dom';
function NewHomeHome() {

    
    return (
        <><Header /><div className="home-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to AgroProLK</h1>
                    <p>Empowering Sri Lankan Farmers with Technology</p>
                    <Link to="/evaluate-service" className="cta-btn">
                           Explore Our Services
                    </Link>
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
                        <h3>Marketplace</h3>
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
                    <Link to="/userallfertilizer" className="cta-btn">
                            Order Fertilizer
                    </Link>
                    <Link to="/orders" className="cta-btn">
                             Tracking Order
                    </Link>
                    <Link to="/market" className="cta-btn">
                             MarketPlace
                    </Link>
                    <Link to="/UserProfile" className="cta-btn">
                            Profile
                    </Link>
            </section>
        </div><Footer/></>
    );
}

export default NewHomeHome;

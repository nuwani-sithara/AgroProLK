import React from 'react';
import AdminHeader from "./AdminHeader";
import Footer from "./Footer";
import './EvaluateService.css'; // Import the CSS file for this page

function EvaluateService() {
    return (
        <>
            <AdminHeader />
            <div className="evaluate-service-container">
                <h1>Evaluate Our Service Capabilities</h1>
                <p>
                    Welcome to the evaluation page! Here you can assess the various service capabilities we offer.
                    Please review the details below to understand how we empower farmers through our comprehensive services.
                </p>
                <div className="service-details">
                    <div className="service-detail">
                        <i className='bx bx-leaf service-icon'></i>
                        <div>
                            <h2>Service 1: Fertilizers</h2>
                            <p>
                                We provide a wide range of fertilizers tailored to the specific needs of different crops.
                                Our fertilizers are designed to improve soil fertility, increase nutrient availability, and maximize crop yield.
                                From organic options to specialized NPK blends, our products ensure your crops thrive in any condition.
                            </p>
                        </div>
                    </div>
                    <div className="service-detail">
                        <i className='bx bx-cart service-icon'></i>
                        <div>
                            <h2>Service 2: Orders</h2>
                            <p>
                                Our order management system allows farmers to easily place and track orders for fertilizers
                                and other agricultural supplies. With a user-friendly interface and real-time tracking,
                                we ensure timely delivery to support your farming needs. Get alerts for new arrivals and special offers right at your fingertips!
                            </p>
                        </div>
                    </div>
                    <div className="service-detail">
                        <i className='bx bx-shopping-bag service-icon'></i>
                        <div>
                            <h2>Service 3: Transport</h2>
                            <p>
                                We offer reliable transportation services for the timely delivery of agricultural products.
                                Our logistics team is trained to handle sensitive materials and ensure products reach farmers without delays.
                                We prioritize your needs, offering flexible delivery options tailored to your schedule.
                            </p>
                        </div>
                    </div>
                    <div className="service-detail">
                        <i className='bx bx-store service-icon'></i>
                        <div>
                            <h2>Service 4: Market</h2>
                            <p>
                                Our platform connects farmers with potential buyers, providing a marketplace for selling
                                produce. We aim to enhance market access for local farmers, helping them maximize their profits.
                                Utilize our platform to showcase your products, gain visibility, and connect with a wider audience.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default EvaluateService;

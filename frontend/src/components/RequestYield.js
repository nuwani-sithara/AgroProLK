import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./styles/RequestYield.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RequestYield() {
    const { state } = useLocation(); // Access passed state
    const yieldDetails = state?.yieldDetails;
    console.log(yieldDetails);
    const userEmail = state?.userEmail;
    console.log(userEmail);
    const navigate = useNavigate(); // To navigate to the next page
    const item_id = yieldDetails._id;
    const [farmerName, setFarmerName] = useState("");
    const [cropType, setCropType] = useState("");
    const [unitPrice, setUnitPrice] = useState(0);
    const [buyerName, setBuyerName] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [requestedYieldsAmount, setRequestedYieldsAmount] = useState(0);
    const [requestedPrice, setRequestedPrice] = useState(0);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        // Set today's date as the default value for the date input
        const today = new Date().toISOString().split("T")[0];
        setDate(today);
    }, []);


    const validatePhoneNumber = (phoneNumber) => {
        const phoneRegex = /^[0-9]{10}$/; // Adjust according to your phone number format
        return phoneRegex.test(phoneNumber);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!buyerName) newErrors.buyerName = "Name is required.";
        //if (!email || !validateEmail(email)) newErrors.email = "Valid email is required.";
        if (!phoneNumber || !validatePhoneNumber(phoneNumber)) newErrors.phoneNumber = "Valid phone number (10 digits) is required.";
        if (!address) newErrors.address = "Address is required.";
        if (requestedYieldsAmount <= 0) newErrors.requestedYieldsAmount = "Requested yield amount must be greater than 0.";
        if (requestedPrice <= 0) newErrors.requestedPrice = "Requested price must be greater than 0.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            alert("Please fix the validation errors.");
            return;
        }
        

        const requestData = {
            farmerName : yieldDetails?.farmerName,
            cropType : yieldDetails?.cropType,
            unitPrice : yieldDetails?.unitPrice,
            buyerName,
            email : userEmail,
            date,
            address,
            phoneNumber,
            requestedYieldsAmount,
            requestedPrice,
            item_id
        };

        console.log(requestData);

        axios.post("http://localhost:8070/requestdetails/add-requestdetails", requestData)
            .then((res) => {
                alert("Request Submitted");
                // After submission, navigate to the view/edit page, passing the new request details
                navigate("/buyer-dashboard", { state: { userEmail, item_id } });
            })
            .catch((err) => {
                console.error("Error submitting request:", err);
            });
    };

    return (
        <>
            <Header />
            <div className="bdy5">
                <div className="detail">
                    <h1 className="s1">Selected Request Details</h1>
                    <h1 className="s2">Farmer: {yieldDetails?.farmerName}</h1>
                    <h1 className="s2">Email: {yieldDetails?.email}</h1>
                    <h1 className="s2">Crop: {yieldDetails?.cropType}</h1>
                    <h1 className="s2">Yields Amount: {yieldDetails?.yieldAmount}</h1>
                    <h1 className="s2">Amount Type : {yieldDetails?.amountType}</h1>
                    <h1 className="s2">Unit Price : {yieldDetails?.unitPrice}</h1>
                </div>

                {/* Request Form */}
                <div style={{marginTop:"20vh"}} className="fmbody2">
                    <form className="fm2">
                        <div className="frm1">
                            <label htmlFor="buyerName" className="form-label">Name</label><br/>
                            <input
                                className="input"
                                type="text"
                                id="buyerName"
                                placeholder="Enter Your Name"
                                value={buyerName}
                                onChange={(e) => setBuyerName(e.target.value)}
                            />
                            <br/>
                            {errors.buyerName && <span className="error">{errors.buyerName}</span>}
                            <label htmlFor="email" className="form-label">Email</label><br/>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter Your Email"
                                value={userEmail}
                                disabled
                            /><br/>
                            {errors.email && <span className="error">{errors.email}</span>}

                            <label htmlFor="date" className="form-label">Date</label><br/>
                            <input
                                type="date"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                min={new Date().toISOString().split("T")[0]} // Prevent past dates
                            />
                            <br/>
                            {errors.date && <span className="error">{errors.date}</span>}

                            <label htmlFor="address" className="form-label">Address</label><br/>
                            <input
                                className="input"
                                type="text"
                                id="address"
                                placeholder="Enter Your Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <br/>
                            {errors.address && <span className="error">{errors.address}</span>}

                            <label htmlFor="phoneNumber" className="form-label">Phone Number</label><br/>
                            <input
                                className="input"
                                type="tel"
                                id="phoneNumber"
                                placeholder="Enter Phone Number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                            <br/>
                            {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}

                            <label htmlFor="requestedYieldsAmount" className="form-label">Requested Yields Amount</label><br/>
                            <input
                                className="input"
                                type="number"
                                id="requestedYieldsAmount"
                                placeholder="Enter Requested Yield Amount"
                                value={requestedYieldsAmount}
                                onChange={(e) => setRequestedYieldsAmount(e.target.value)}
                            />
                            <br/>
                            {errors.requestedYieldsAmount && <span className="error">{errors.requestedYieldsAmount}</span>}

                            <label htmlFor="requestedPrice" className="form-label">Requested Price</label><br/>
                            <input
                                className="input"
                                type="number"
                                id="requestedPrice"
                                placeholder="Enter Requested Price"
                                value={requestedPrice}
                                onChange={(e) => setRequestedPrice(e.target.value)}
                            />
                            {errors.requestedPrice && <span className="error">{errors.requestedPrice}</span>}
                        </div>
                        <br/>
                        <button type="button" className="bn2" onClick={handleSubmit}>Submit Request</button>
                        
                    </form>
                    <br />
                    <br />
                </div>
            </div>
            <Footer />
        </>
    );
}

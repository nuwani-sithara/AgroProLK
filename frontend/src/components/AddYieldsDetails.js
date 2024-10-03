import React,{useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./styles/AddYieldsDetails.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AddYieldsDetails(){

    const { state } = useLocation(); 
    const userEmail = state?.userEmail;
    console.log(userEmail);
    const navigate = useNavigate();
    const [farmerName, setName] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [harvestedDate, setHarvestedDate] = useState("");
    const [cropType, setCropTYpe] = useState("");
    const [yieldAmount, setYieldAmount] = useState("");
    const [amountType, setAmountType] = useState("");
    const [unitPrice, setUnitPrice] = useState("");

    // Set the current date automatically
    useEffect(() => {
        const currentDate = new Date().toISOString().split("T")[0]; // Get the current date in 'YYYY-MM-DD' format
        setDate(currentDate);
        console.log(currentDate)
    }, []);

    // Date validation
    // function isDateValid(inputDate) {
    //     const currentDate = new Date();
    //     const selectedDate = new Date(inputDate);
    
    //     return selectedDate.toDateString() === currentDate.toDateString();
    // }

    // Phone number validation (10 digits)
    function isPhoneNumberValid(phone) {
        return /^[0-9]{10}$/.test(phone);
    }



    //send data to the database
    function sendData(e){
        e.preventDefault();

        // Phone number validation
        if (!isPhoneNumberValid(phoneNumber)) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        // Date validation
        // if (!isDateValid(date)) {
        //     alert("Please enter the valid date");
        //     return;
        // }

        // Amount validation
        if (!/^\d+(\.\d{1,2})?$/.test(yieldAmount)) {
            alert("Please enter a valid number for the yields amount.");
            setYieldAmount(""); 
            return;
        }

        const newYieldsDetails = {
            farmerName,
            email : userEmail,
            date,
            address,
            phoneNumber,
            harvestedDate,
            cropType,
            yieldAmount,
            amountType,
            unitPrice
        }

        console.log(newYieldsDetails);

        axios.post("http://localhost:8070/yieldsdetails/add-yieldsdetails", newYieldsDetails)
        .then((response) => {
             alert("Your yields details added successfully!");
             console.log('Response:', response);
             console.log('Yields ID', response.data.yieldsId);
             navigate("/seller-dashboard", {state: { userEmail }});

             setName("");
             setEmail(userEmail);
             setDate("");
             setAddress("");
             setPhoneNumber("");
             setHarvestedDate("");
             setCropTYpe("");
             setYieldAmount("");
             setAmountType("");
             setUnitPrice("");

         }).catch((err) => {
             alert(err);
         });
    }


    return(
        
            <><><Header /><div className="fmbody">

            <h1 className="title">Add Your Yields Details</h1>
            <p className="title2">You must fill this out before selling your yields!</p>
            <br />
            <form className="fm1" onSubmit={sendData}>
                <div className="dvdv">
                    <div className="mb-3">
                        <label for="farmerName" className="form-label">Name</label>
                        <input type="text" className="form-control" id="farmerName" placeholder="Enter your name"
                        value={farmerName} onChange={(e) => setName(e.target.value)}></input>
                    </div>
                    <div className="mb-3">
                        <label for="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email"
                        value={userEmail} disabled ></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="date" className="form-label">Date</label>
                        <input type="date" className="form-control" id="date" value={date} readOnly></input>
                    </div>
                    <div className="mb-3">
                        <label for="address" className="form-label">Address</label>
                        <input type="text" className="form-control" id="address" placeholder="Enter your address"
                         value={address} onChange={(e) => setAddress(e.target.value)}></input>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">
                        Phone Number
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="phoneNumber"
                        placeholder="Enter your phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    </div>
                    <div className="mb-3">
                        <label for="harvestedDate" className="form-label">Enter Harvested Date</label>
                        <input type="date" className="form-control" id="harvestedDate" placeholder="Enter harvested date"
                        value={harvestedDate} onChange={(e) => setHarvestedDate(e.target.value)}></input>
                    </div>
                    <div className="mb-3">
                        <label for="cropType" className="form-label">Enter Crop Type</label>
                        <input type="text" className="form-control" id="cropType" placeholder="Enter your crop type"
                        value={cropType} onChange={(e) => setCropTYpe(e.target.value)}></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="yieldAmount" className="form-label">Enter Yields Amount</label>
                        <div className="input-group">
                            <input
                                type="number"
                                className="form-control"
                                id="yieldAmount"
                                placeholder="Enter your yields amount" 
                                value={yieldAmount} onChange={(e) => setYieldAmount(e.target.value)}/>
                            <select 
                                className="form-select" 
                                id="amountType"
                                value={amountType} 
                                onChange={(e) => setAmountType(e.target.value)}>
                                <option value="kg">kg</option>
                                <option value="g">g</option>
                                <option value="ton">ton</option>
                                <option value="lbs">lbs</option>
                                <option value="oz">oz</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="unitPrice" className="form-label">Enter Unit Price</label>
                        <input
                            type="number"
                            className="form-control"
                            id="unitPrice"
                            placeholder="Enter unit price"
                            step="0.01"
                            min="0" 
                            value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)}/>
                    </div>

                    <br />
                    <button type="submit" className="btn btn-outline-primary">Submit</button>
                    {/* <Link to="/view-yieldsdetails" className="btn btn-outline-primary">View Details</Link> */}
                    {/* <Link to={{ pathname: "/viewyieldsdetails", state: { email } }} className="btn btn-outline-primary">
                    View Details
                    </Link> */}

                    <br/>

                </div>
            </form>
        </div>
        <br/>
        </><Footer /></>
    )
}
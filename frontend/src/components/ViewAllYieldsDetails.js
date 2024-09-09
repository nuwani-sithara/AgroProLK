import React, {useState, useEffect} from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./styles/AllYieldsDetails.css";


export default function ViewAllYieldsDetails() {

    const [yieldsdetails, setYields] = useState([]);
    const [editedItem, setEditedItem] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getYields();
    }, []);

    // fetch all details
    const getYields = () => {
        axios.get("http://localhost:8070/yieldsdetails/view-yieldsdetails")
        .then((res) => {
            setYields(res.data);
        })
        .catch((err) => {
            console.error("Error fetching yields details:", err);
        });
    };

    // Inside ViewAllYieldsDetails.js

const handleRequestClick = (item) => {
    // Navigate to the request page and pass the selected item data
    navigate(`/request-yield`, { state: { yieldDetails: item } });
};



    return(
        <><><Header />
        {/* <h1 className="heading">Selling Yields of Yours</h1> */}
        <div className="tb">
            {/* <hr style={{ color: 'white' }} /> */}
            <table className="table table-hover">

                <thead className="table-dark">
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Farmer Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Date</th>
                        <th scope="col">Address</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Harvested Date</th>
                        <th scope="col">Crop Type</th>
                        <th scope="col">Yields Amount</th>
                        <th scope="col">Amount Type</th>
                        <th scope="col">Unit Price</th>
                        <th scope="col">Add Request</th>
                    </tr>
                </thead>
                <tbody className="tblbdy">
                    {yieldsdetails.map((item, index) => (
                        <tr className="tblrw" key={item._id}>
                            <th scope="row">{index + 1}</th>

                            <td>{editedItem === item._id ? <input type="text" defaultValue={item.farmerName} data-id={`${item._id}-farmerName`} /> : item.farmerName}</td>

                            <td>{editedItem === item._id ? <input type="email" defaultValue={item.email} data-id={`${item._id}-email`} /> : item.email}</td>

                            <td>
                            {editedItem === item._id ? (
                                        <input
                                            type="date"
                                            defaultValue={new Date(item.date).toISOString().split('T')[0]} // Format to yyyy-mm-dd
                                            data-id={`${item._id}-date`}
                                            disabled
                                        />
                                    ) : (
                                        item.date
                                    )}
                            </td>

                            <td>{editedItem === item._id ? <input type="text" defaultValue={item.address} data-id={`${item._id}-address`} /> : item.address}</td>

                            <td>{editedItem === item._id ? <input type="text" defaultValue={item.phoneNumber} data-id={`${item._id}-phoneNumber`} /> : item.phoneNumber}</td>

                            <td>
                            {editedItem === item._id ? (
                                        <input
                                            type="date"
                                            defaultValue={new Date(item.harvestedDate).toISOString().split('T')[0]} // Format to yyyy-mm-dd
                                            data-id={`${item._id}-harvestedDate`}
                                            disabled
                                        />
                                    ) : (
                                        item.harvestedDate
                                    )}
                            </td>

                            <td>{editedItem === item._id ? <input type="text" defaultValue={item.cropType} data-id={`${item._id}-cropType` } disabled /> : item.cropType}</td>

                            <td>{editedItem === item._id ? <input type="number" defaultValue={item.yieldAmount} data-id={`${item._id}-yieldAmount`} disabled /> : item.yieldAmount}</td>

                            <td>{editedItem === item._id ? <input type="text" defaultValue={item.amountType} data-id={`${item._id}-amountType`} disabled /> : item.amountType}</td>

                            <td>{editedItem === item._id ? <input type="number" defaultValue={item.unitPrice} data-id={`${item._id}-unitPrice`} disabled /> : item.unitPrice}</td>

                            

                            <td><button className="chkbtn" onClick={() => handleRequestClick(item)}>Request</button></td>                        </tr>
                    ))}
                </tbody>

            </table>

           

        </div></><Footer /></>
    )
}
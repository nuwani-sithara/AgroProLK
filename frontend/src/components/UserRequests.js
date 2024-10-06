import React, { useState, useEffect } from 'react';
import { useLocation, Navigate } from "react-router-dom";
import axios from 'axios';
import "./styles/UserRequests.css";
import Header from './Header';
import Footer from './Footer';

export default function UserRequests() {
    const { state } = useLocation();
    const userEmail = state?.userEmail;
    console.log(userEmail);

    const [requestDetails, setRequestDetails] = useState([]);
    const [itemDetailsMap, setItemDetailsMap] = useState({});
    const [editedItem, setEditedItem] = useState(null);

    useEffect(() => {
        if (userEmail) {
            axios.get(`http://localhost:8070/requestdetails/get-requestdetails-by-email/${userEmail}`)
                .then((res) => {
                    const details = Array.isArray(res.data.requestdetail) ? res.data.requestdetail : [];
                    setRequestDetails(details);

                })
                .catch((err) => {
                    console.error('Error fetching requests:', err);
                });
        }
    }, [userEmail]);

   
    const handleEdit = (requestId) => {
        setEditedItem(requestId);
    };

    const saveEdit = (requestId, updatedData) => {
        axios.put(`http://localhost:8070/requestdetails/update-requestdetails/${requestId}`, updatedData)
            .then((res) => {
                alert("Request Updated!");
                setEditedItem(null);
                setRequestDetails(requestDetails.map(item => (item._id === requestId ? res.data.updatedRequest : item)));
            })
            .catch((err) => {
                console.error('Error saving data:', err);
            });
    };

    const deleteData = (requestId) => {
        axios.delete(`http://localhost:8070/requestdetails/delete-requestdetails/${requestId}`)
            .then(() => {
                alert("Request Deleted!");
                setRequestDetails(requestDetails.filter(item => item._id !== requestId));
            })
            .catch((err) => {
                console.error('Error deleting request:', err);
            });
    };

    return (
        <>
            <Header />
            <div className="tb">
                {requestDetails.length === 0 ? (
                    <p>No requests found for this user.</p>
                ) : (
                    <table className="table table-hover">
                        <thead className="table-dark">
                            <tr className="tblrw">
                                
                                <th scope="col">Farmer Name</th>
                                <th scope="col">Crop Type</th>
                                <th scope="col">Unit Price</th>
                                <th scope="col">Address</th>
                                <th scope="col">Phone Number</th>
                                <th scope="col">Requested Yields Amount</th>
                                <th scope="col">Requested Price</th>
                                <th scope="col">Actions</th>
                                <th scope="col">Status</th>

                            </tr>
                        </thead>
                        <tbody className="tblbdy">
                            {requestDetails.map((requestDetail) => (
                                requestDetail && requestDetail._id ? (
                                    <tr key={requestDetail._id}>
                                        <td>
                                        {editedItem === requestDetail._id ? (
                                                <input type="text" defaultValue={requestDetail.farmerName} data-id={`${requestDetail._id}-farmerName`} disabled/>
                                            ) : (
                                                requestDetail.farmerName
                                            )}
                                        </td>
                                        <td>
                                        {editedItem === requestDetail._id ? (
                                                <input type="text" defaultValue={requestDetail.cropType} data-id={`${requestDetail._id}-cropType`} disabled/>
                                            ) : (
                                                requestDetail.cropType
                                            )}
                                        </td>
                                        <td>
                                        {editedItem === requestDetail._id ? (
                                                <input type="text" defaultValue={requestDetail.unitPrice} data-id={`${requestDetail._id}-unitPrice`} disabled/>
                                            ) : (
                                                requestDetail.unitPrice
                                            )}
                                        </td>
                                        
                                        <td>
                                            {editedItem === requestDetail._id ? (
                                                <input type="text" defaultValue={requestDetail.address} data-id={`${requestDetail._id}-address`} />
                                            ) : (
                                                requestDetail.address
                                            )}
                                        </td>
                                        <td>
                                            {editedItem === requestDetail._id ? (
                                                <input type="text" defaultValue={requestDetail.phoneNumber} data-id={`${requestDetail._id}-phoneNumber`} />
                                            ) : (
                                                requestDetail.phoneNumber
                                            )}
                                        </td>
                                        <td>
                                            {editedItem === requestDetail._id ? (
                                                <input type="number" defaultValue={requestDetail.requestedYieldsAmount} data-id={`${requestDetail._id}-requestedYieldsAmount`} />
                                            ) : (
                                                requestDetail.requestedYieldsAmount
                                            )}
                                        </td>
                                        <td>
                                            {editedItem === requestDetail._id ? (
                                                <input type="number" defaultValue={requestDetail.requestedPrice} data-id={`${requestDetail._id}-requestedPrice`} />
                                            ) : (
                                                requestDetail.requestedPrice
                                            )}
                                        </td>
                                        <td>
                                        {editedItem === requestDetail._id ? (
                                            <div className="action-buttons">
                                                <button
                                                    className="svebtn"
                                                    onClick={() => saveEdit(requestDetail._id, {
                                                        address: document.querySelector(`input[data-id="${requestDetail._id}-address"]`).value,
                                                        phoneNumber: document.querySelector(`input[data-id="${requestDetail._id}-phoneNumber"]`).value,
                                                        requestedYieldsAmount: document.querySelector(`input[data-id="${requestDetail._id}-requestedYieldsAmount"]`).value,
                                                        requestedPrice: document.querySelector(`input[data-id="${requestDetail._id}-requestedPrice"]`).value,
                                                    })}
                                                >
                                                    Save
                                                </button>
                                                <button className="cnlbtn" onClick={() => setEditedItem(null)}>Cancel</button>
                                            </div>
                                        ) : (
                                            <div className="action-buttons">
                                                <button className="editbtn" onClick={() => handleEdit(requestDetail._id)}>Edit</button>
                                                <button className="deletebtn" onClick={() => deleteData(requestDetail._id)}>Delete</button>
                                            </div>
                                        )}
                                        </td>

                                        <td>
                                        {editedItem === requestDetail._id ? (
                                                <input type="text" defaultValue={requestDetail.status} data-id={`${requestDetail._id}-status`} disabled/>
                                            ) : (
                                                requestDetail.status
                                            )}
                                        </td>

                                    </tr>
                                ) : null
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <Footer />
        </>
    );
}

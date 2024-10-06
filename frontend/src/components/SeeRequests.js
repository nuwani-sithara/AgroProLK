import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';
import "./styles/SeeRequests.css";
import Header from './Header';
import Footer from './Footer';

export default function SeeRequests() {
    const { state } = useLocation();
    const item_id = state?.item_id;
    console.log("Item ID: ", item_id);

    const [requestsDetails, setRequestsDetails] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (item_id) {
            axios.get(`http://localhost:8070/requestdetails/get-requestdetails-by-id/${item_id}`)
            .then((res) => {
                console.log("API Response: ", res.data); 
                const details = Array.isArray(res.data.requestdetail) ? res.data.requestdetail : [];
                console.log("Details: ", details); 
                const filteredDetails = details.filter(request => request.status !== 'pending');
                console.log("Filtered Details: ", filteredDetails); 
                setRequestsDetails(filteredDetails);
            })
            .catch((err) => {
                console.error('Error fetching requests:', err);
            })
            .finally(() => {
                setLoading(false);
            });
        }
    }, [item_id]);

    const handleStatusChange = (requestId, newStatus) => {
        axios.put(`http://localhost:8070/requestdetails/update-requestdetails/${requestId}`, { status: newStatus })
        .then((res) => {
            alert("Status updated");
            console.log("Status updated:", res.data);
            setRequestsDetails(prevDetails => 
                prevDetails.map(request => 
                    request._id === requestId ? { ...request, status: newStatus } : request
                )
            );
        })
        .catch((err) => {
            console.error('Error updating status:', err);
        });
    }

    return (
        <>
            <Header />
            <div className="tb">
                {loading ? (
                    <p>Loading requests...</p>
                ) : (
                    requestsDetails.length === 0 ? (
                        <p className="nofound">No requests found for this user...</p>
                    ) : (
                        <table className="table table-hover">
                            <thead className="table-dark">
                                <tr className="tblrw">
                                    <th scope="col">Buyer Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Phone Number</th>
                                    <th scope="col">Requested Yields Amount</th>
                                    <th scope="col">Requested Price</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="tblbdy">
                                {requestsDetails.map((request) => (
                                    <tr key={request._id}>
                                        <td>{request.buyerName}</td>
                                        <td>{request.email}</td>
                                        <td>{new Date(request.date).toLocaleDateString()}</td>
                                        <td>{request.address}</td>
                                        <td>{request.phoneNumber}</td>
                                        <td>{request.requestedYieldsAmount}</td>
                                        <td>{request.requestedPrice}</td>
                                        <td>{request.status}</td>
                                        <td>
                                            {/* Dropdown to change the status */}
                                            <select 
                                                defaultValue={request.status} 
                                                onChange={(e) => handleStatusChange(request._id, e.target.value)}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="approved">Approved</option>
                                                <option value="rejected">Rejected</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                )}
            </div>
            <Footer />
        </>
    );
}

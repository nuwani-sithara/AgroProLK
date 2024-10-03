import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import "./styles/AllYieldsDetails.css";
import "./styles/RequestsManage.css";
import Footer from "./Footer";

export default function RequestsManage() {
    const [requestdetails, setRequests] = useState([]);
    const [editedItem, setEditedItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getRequests();
    }, []);

    const getRequests = () => {
        axios.get("http://localhost:8070/requestdetails/view-requestdetails")
            .then((res) => {
                setRequests(res.data);
            }).catch((err) => {
                console.error("Error fetching requests:", err);
            });
    };

    const handleEdit = (requestid) => {
        setEditedItem(requestid);
    };

    const saveEdit = (requestid, newData) => {
        axios.put(`http://localhost:8070/requestdetails/update-requestdetails/${requestid}`, newData)
            .then(() => {
                alert("Request updated");
                setEditedItem(null);
                getRequests();
            }).catch((err) => {
                console.error("Error updating requests", err);
            });
    };

    const deleteData = (requestid) => {
        axios.delete(`http://localhost:8070/requestdetails/delete-requestdetails/${requestid}`)
            .then(() => {
                alert("Request deleted!");
                getRequests();
            }).catch((err) => {
                console.error("Error deleting request", err);
            });
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredRequests = requestdetails.filter(item =>
        item.email && item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const updateStatus = (requestid, status) => {
        saveEdit(requestid, { status });
    };

    return (
        <>
            <AdminHeader />
            <div className="srh">
                <h1 style={{ textAlign: "center", backgroundColor: "white" }}>All Requests</h1>

                <div className="search-dv">
                    <form className="d-flex" role="search">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search by Email.."
                            aria-label="Search"
                            value={searchTerm}
                            onChange={handleSearchChange} />
                    </form>
                </div>
            </div>

            <div style={{marginTop:"0%"}} className="tb">
                <table style={{marginTop:"0%"}} className="table table-hover">
                    <thead className="table-dark">
                        <tr className="tblrw">
                            <th scope="col">Buyer Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Date</th>
                            <th scope="col">Address</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Requestsed Yield Amount</th>
                            <th scope="col">Requested Pricer</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="tblbdy">
                        {filteredRequests.map((request) => (
                            <tr key={request._id}>
                                <td>{request.buyerName}</td>
                                <td>{request.email}</td>
                                <td>{request.date}</td>
                                <td>{request.address}</td>
                                <td>{request.phoneNumber}</td>
                                <td>{request.requestedYieldsAmount}</td>
                                <td>{request.requestedPrice}</td>

                                <td>{editedItem === request._id ? (
                                    <select defaultValue={request.status} onChange={(e) => updateStatus(request._id, e.target.value)}>
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                ) : (
                                    request.status
                                )}</td>
                                <td>
                                    {editedItem === request._id ? (
                                        <button onClick={() => setEditedItem(null)}>Save</button>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEdit(request._id)}>Edit</button>
                                            <button onClick={() => deleteData(request._id)}>Delete</button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    );
}

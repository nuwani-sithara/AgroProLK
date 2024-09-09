import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import "./styles/AllYieldsDetails.css";
import "./styles/RequestsManage.css";

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

    return (
        <>
            <Header />
            <div className="srh">
            <h1 style={{textAlign: "center", backgroundColor:"white"}}>All Requests</h1>
                
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

            <div className="tb">
                <table className="table table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Buyer Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Date</th>
                            <th scope="col">Address</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Requested Yields Amount</th>
                            <th scope="col">Requested Price</th>
                            <th scope="col">Status</th> {/* Add Status column */}
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="tblbdy">
                        {filteredRequests.map((item, index) => (
                            <tr className="tblrw" key={item._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{editedItem === item._id ? <input type="text" defaultValue={item.buyerName} data-id={`${item._id}-buyerName`} /> : item.buyerName}</td>
                                <td>{editedItem === item._id ? <input type="email" defaultValue={item.email} data-id={`${item._id}-email`} /> : item.email}</td>
                                <td>{editedItem === item._id ? <input type="date" defaultValue={new Date(item.date).toISOString().split('T')[0]} data-id={`${item._id}-date`} disabled /> : item.date}</td>
                                <td>{editedItem === item._id ? <input type="text" defaultValue={item.address} data-id={`${item._id}-address`} /> : item.address}</td>
                                <td>{editedItem === item._id ? <input type="text" defaultValue={item.phoneNumber} data-id={`${item._id}-phoneNumber`} /> : item.phoneNumber}</td>
                                <td>{editedItem === item._id ? <input type="number" defaultValue={item.requestedYieldsAmount} data-id={`${item._id}-requestedYieldsAmount`} /> : item.requestedYieldsAmount}</td>
                                <td>{editedItem === item._id ? <input type="number" defaultValue={item.requestedPrice} data-id={`${item._id}-requestedPrice`} /> : item.requestedPrice}</td>

                                {/* Add dropdown for status */}
                                <td>
                                    {editedItem === item._id ? (
                                        <select data-id={`${item._id}-status`} defaultValue={item.status || "pending"}>
                                            <option value="available">Available</option>
                                            <option value="accepted">Accepted</option>
                                            <option value="pending">Pending</option>
                                            <option value="denied">Denied</option>
                                        </select>
                                    ) : (
                                        item.status || "pending"
                                    )}
                                </td>

                                <td>
                                    {editedItem === item._id ? (
                                        <>
                                            <button className="svebtn"
                                                onClick={() => saveEdit(item._id, {
                                                    buyerName: document.querySelector(`input[data-id="${item._id}-buyerName"]`).value,
                                                    email: document.querySelector(`input[data-id="${item._id}-email"]`).value,
                                                    date: document.querySelector(`input[data-id="${item._id}-date"]`).value,
                                                    address: document.querySelector(`input[data-id="${item._id}-address"]`).value,
                                                    phoneNumber: document.querySelector(`input[data-id="${item._id}-phoneNumber"]`).value,
                                                    requestedYieldsAmount: document.querySelector(`input[data-id="${item._id}-requestedYieldsAmount"]`).value,
                                                    requestedPrice: document.querySelector(`input[data-id="${item._id}-requestedPrice"]`).value,
                                                    status: document.querySelector(`select[data-id="${item._id}-status"]`).value,  // Add status value
                                                })}
                                            >
                                                Save
                                            </button>
                                            <button className="cnlbtn" onClick={() => setEditedItem(null)}>Cancel</button>
                                        </>
                                    ) : (
                                        <button
                                            type="button"
                                            className="editbtn"
                                            onClick={() => handleEdit(item._id)}
                                        >
                                            Edit
                                        </button>
                                    )}
                                </td>

                                <td>
                                    <button
                                        type="button"
                                        className="deletebtn"
                                        onClick={() => deleteData(item._id)}
                                    >
                                        Delete
                                    </button>
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

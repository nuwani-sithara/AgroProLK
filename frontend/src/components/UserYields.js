import React, { useState, useEffect} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import "./styles/UserYields.css";
import Header from './Header';
import Footer from './Footer';

export default function UserYields(){
    const {state} = useLocation();
    const userEmail = state?.userEmail;
    console.log(userEmail);

    const item_id = state?.item_id;
    console.log(item_id);

    const navigate = useNavigate();

    const [yieldsDetails, setYieldsDetails] = useState([]);
    const [itemDetailsMap, setItemDetailsMap] = useState({});
    const [editedItem, setEditedItem] = useState(null);

    useEffect(() => {
        if(userEmail){
            axios.get(`http://localhost:8070/yieldsdetails/get-yieldsdetails-by-email/${userEmail}`)
            .then((res) => {
                const details = Array.isArray(res.data.yieldsdetail) ? res.data.yieldsdetail : [];
                setYieldsDetails(details);
            })
            .catch((err) => {
                console.error('Error fetching yields:', err);
            })
        }
    }, [userEmail]);

    const handleEdit = (yieldsId) => {
        setEditedItem(yieldsId);
    };

    const saveEdit = (yieldsId, updatedData) => {
        axios.put(`http://localhost:8070/yieldsdetails/update-yieldsdetails/${yieldsId}`, updatedData)
        .then((res) => {
            alert("Yields Updated!");
            setEditedItem(null);
            setYieldsDetails(yieldsDetails.map(item => (item._id === yieldsId ? res.data.updatedData : item)));
        })
        .catch((err) => {
            console.error('Error saving data:', err);
        })
    };

    const deleteData = (yieldsId) => {
        axios.delete(`http://localhost:8070/yieldsdetails/delete-yieldsdetails/${yieldsId}`)
        .then(() => {
            alert("Yields Deleted!");
            setYieldsDetails(yieldsDetails.filter(item => item._id !== yieldsId));
        })
        .catch((err) => {
            console.error('Error deleting yields:', err);
        });
    };

    function handleRequest(yieldsDetails) {
        if (yieldsDetails && yieldsDetails._id) {
            navigate("/see-requests", { state: { item_id: yieldsDetails._id } });
        } else {
            console.error("No valid item ID to pass to SeeRequests");
        }
    }
    

    return(
        <><><Header /><div className="tb">
            {yieldsDetails.length === 0 ? (
                <p>No requests found for this user.</p>
            ) : (
                <table className="table table-hover">
                    <thead className="table-dark">
                        <tr className="tblrw">

                            <th scope="col">Crop Type</th>
                            <th scope="col">Yield Amount</th>
                            <th scope="col">Amount Type</th>
                            <th scope="col">Unit Price</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="tblbdy">
                        {yieldsDetails.map((yieldDetail) => (
                            yieldDetail && yieldDetail._id ? (
                                <tr key={yieldDetail._id}>
                                    <td>
                                        {editedItem === yieldDetail._id ? (
                                            <input type="text" defaultValue={yieldDetail.cropType} data-id={`${yieldDetail._id}-cropType`} />
                                        ) : (
                                            yieldDetail.cropType
                                        )}
                                    </td>
                                    <td>
                                        {editedItem === yieldDetail._id ? (
                                            <input type="number" defaultValue={yieldDetail.yieldAmount} data-id={`${yieldDetail._id}-yieldAmount`} />
                                        ) : (
                                            yieldDetail.yieldAmount
                                        )}
                                    </td>
                                    <td>
                                        {editedItem === yieldDetail._id ? (
                                            <input type="text" defaultValue={yieldDetail.amountType} data-id={`${yieldDetail._id}-amountType`} />
                                        ) : (
                                            yieldDetail.amountType
                                        )}
                                    </td>
                                    <td>
                                        {editedItem === yieldDetail._id ? (
                                            <input type="number" defaultValue={yieldDetail.unitPrice} data-id={`${yieldDetail._id}-unitPrice`} />
                                        ) : (
                                            yieldDetail.unitPrice
                                        )}
                                    </td>
                                    <td>
                                        {editedItem === yieldDetail._id ? (
                                            <>
                                                <button
                                                    onClick={() => saveEdit(yieldDetail._id, {
                                                        cropType: document.querySelector(`input[data-id="${yieldDetail._id}-cropType"]`).value,
                                                        yieldAmount: document.querySelector(`input[data-id="${yieldDetail._id}-yieldAmount"]`).value,
                                                        amountType: document.querySelector(`input[data-id="${yieldDetail._id}-amountType"]`).value,
                                                        unitPrice: document.querySelector(`input[data-id="${yieldDetail._id}-unitPrice"]`).value,
                                                    })}
                                                >
                                                    Save
                                                </button>
                                                <button className="cnlbtn" onClick={() => setEditedItem(null)}>Cancel</button>
                                            </>
                                        ) : (
                                            <>
                                                <button className="editbtn" onClick={() => handleEdit(yieldDetail._id)}>Edit</button>
                                                <button className="deletebtn" onClick={() => deleteData(yieldDetail._id)}>Delete</button>
                                                <button onClick={() => handleRequest(yieldDetail)}>See Requests</button>
                                                


                                            </>
                                        )}
                                    </td>
                                </tr>
                            ) : null
                        ))}
                    </tbody>
                </table>
            )}

          <div>
            <button>See Requests</button>
          </div>
        </div></><Footer /></>
    )
}
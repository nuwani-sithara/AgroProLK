import React, {useState, useEffect} from "react";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import Footer from "./Footer";
import "./styles/AllYieldsDetails.css";
import jsPDF from "jspdf";
import "jspdf-autotable";


export default function AllYieldsDetails() {

    const [yieldsdetails, setYields] = useState([]);
    const [editedItem, setEditedItem] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState({}); 


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

    const handleEdit = (yieldsid) => {
        setEditedItem(yieldsid); 
    };

    //update
    const saveEdit = (yieldsid, newData) => {
        axios.put(`http://localhost:8070/yieldsdetails/update-yieldsdetails/${yieldsid}`, newData)
        .then(() => {
            alert("Yields detail updated");
            setEditedItem(null);
            getYields();
        }).catch((err) => {
            console.error("Error updating yields detail", err);
        })
    }

    //delete
    function deleteData(yieldsid){
        axios.delete(`http://localhost:8070/yieldsdetails/delete-yieldsdetails/${yieldsid}`)
        .then(() => {
             alert("Yields deyail deleted!");
             axios.get("http://localhost:8070/yieldsdetails")
             .then(response => {
                setYields(response.data);

             })
             .catch(error => {
                console.error('Error fetching data', error);
             });
        })
        .catch((err) => {
            alert(err);
        })
    }

    // Handle Status Change
    const handleStatusChange = (yieldsid, newStatus) => {
        setSelectedStatus((prevStatus) => ({
            ...prevStatus,
            [yieldsid]: newStatus,
        }));
    };

    const generateYieldsDetailsReciept = () => {
        const doc = new jsPDF();
    
        const watermarkText = "Yields Details";
        doc.setFontSize(10);
        doc.setTextColor(200, 200, 200); 
        doc.text(
            watermarkText, 
            doc.internal.pageSize.getWidth() / 2, 
            doc.internal.pageSize.getHeight() / 2, 
            { align: "center", angle: 45 }
        );
    
        const headerText = "All Yields Details";
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(headerText, 10, 10);
    
        doc.autoTable({
            head: [['farmer Name', 'Date', 'Address', 'Phone Number', 'Harvested Date', 'Crop Type', 'Yield Amount', 'Amount Type', 'Unit Price']],
            body: yieldsdetails.map(item => [
                item.farmerName, 
                item.date, 
                item.address, 
                item.phoneNumber, 
                item.harvestedDate, 
                item.cropType, 
                item.yieldAmount, 
                item.amountType, 
                item.unitPrice
            ]),
            startY: 20,
            styles: { fontSize: 8 }  
        });
    
        doc.save("allYeildsDetails.pdf");
    }
    


    return (
        <>
            <AdminHeader />
            <div className="tb">
            <h1 className="heading">All Yields Details</h1>
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
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody className="tblbdy">
                        {yieldsdetails.map((item, index) => (
                            <tr className="tblrw" key={item._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{editedItem === item._id ? <input type="text" defaultValue={item.farmerName} data-id={`${item._id}-farmerName`} /> : item.farmerName}</td>
                                <td>{editedItem === item._id ? <input type="email" defaultValue={item.email} data-id={`${item._id}-email`} /> : item.email}</td>
                                <td>{editedItem === item._id ? <input type="date" defaultValue={new Date(item.date).toISOString().split('T')[0]} data-id={`${item._id}-date`} disabled /> : item.date}</td>
                                <td>{editedItem === item._id ? <input type="text" defaultValue={item.address} data-id={`${item._id}-address`} /> : item.address}</td>
                                <td>{editedItem === item._id ? <input type="text" defaultValue={item.phoneNumber} data-id={`${item._id}-phoneNumber`} /> : item.phoneNumber}</td>
                                <td>{editedItem === item._id ? <input type="date" defaultValue={new Date(item.harvestedDate).toISOString().split('T')[0]} data-id={`${item._id}-harvestedDate`} disabled /> : item.harvestedDate}</td>
                                <td>{editedItem === item._id ? <input type="text" defaultValue={item.cropType} data-id={`${item._id}-cropType`} /> : item.cropType}</td>
                                <td>{editedItem === item._id ? <input type="number" defaultValue={item.yieldAmount} data-id={`${item._id}-yieldAmount`} /> : item.yieldAmount}</td>
                                <td>{editedItem === item._id ? <input type="text" defaultValue={item.amountType} data-id={`${item._id}-amountType`} /> : item.amountType}</td>
                                <td>{editedItem === item._id ? <input type="number" defaultValue={item.unitPrice} data-id={`${item._id}-unitPrice`} /> : item.unitPrice}</td>
                                <td>
                                    {editedItem === item._id ? (
                                        <>
                                            <button className="svebtn"
                                                onClick={() => saveEdit(item._id, {
                                                    farmerName: document.querySelector(`input[data-id="${item._id}-farmerName"]`).value,
                                                    email: document.querySelector(`input[data-id="${item._id}-email"]`).value,
                                                    date: document.querySelector(`input[data-id="${item._id}-date"]`).value,
                                                    address: document.querySelector(`input[data-id="${item._id}-address"]`).value,
                                                    phoneNumber: document.querySelector(`input[data-id="${item._id}-phoneNumber"]`).value,
                                                    harvestedDate: document.querySelector(`input[data-id="${item._id}-harvestedDate"]`).value,
                                                    cropType: document.querySelector(`input[data-id="${item._id}-cropType"]`).value,
                                                    yieldAmount: document.querySelector(`input[data-id="${item._id}-yieldAmount"]`).value,
                                                    amountType: document.querySelector(`input[data-id="${item._id}-amountType"]`).value,
                                                    unitPrice: document.querySelector(`input[data-id="${item._id}-unitPrice"]`).value,
                                                })}>
                                                Save
                                            </button>
                                            <button className="cnlbtn" onClick={() => setEditedItem(null)}>Cancel</button>
                                        </>
                                    ) : (
                                        <button type="button" className="editbtn" onClick={() => handleEdit(item._id)}>Edit</button>
                                    )}
                                </td>
                                <td>
                                    <button type="button" className="deletebtn" onClick={() => deleteData(item._id)}>Delete</button>
                                </td>
                                <td>
                                    <div className="dropdown">
                                        <button className="btn10" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            {selectedStatus[item._id] || "Select Status"}
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <button className="dropdown-item" onClick={() => handleStatusChange(item._id, "Approved")}>Approved</button>
                                            </li>
                                            <li>
                                                <button className="dropdown-item" onClick={() => handleStatusChange(item._id, "Pending")}>Pending</button>
                                            </li>
                                            <li>
                                                <button className="dropdown-item" onClick={() => handleStatusChange(item._id, "Declined")}>Declined</button>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="d-grid gap-2 col-6 mx-auto">
                    <button className="btn btn-secondary ml-2" onClick={() => generateYieldsDetailsReciept(yieldsdetails)}>Download Report</button>
                </div>
            </div>
            <Footer />
        </>
    );
}    
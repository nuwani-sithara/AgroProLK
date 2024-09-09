import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import _ from 'lodash'; // Import lodash
import './styles/UsersTable.css';
import Footer from './Footer';
import AdminHeader from './AdminHeader';

const AllUsers = () => {
    const [users, setUsers] = useState([]);
    const [editedUser, setEditedUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8070/users/getallusers")
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    function updateUser(id, updatedUserData) {
        axios.put(`http://localhost:8070/users/updateUser/${id}`, updatedUserData)
            .then(() => {
                alert("System user updated");
                axios.get("http://localhost:8070/users/getallusers")
                    .then(response => {
                        setUsers(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            })
            .catch((err) => {
                alert(err);
            });
    }

    function deleteUser(id) {
        axios.delete(`http://localhost:8070/users/deleteUser/${id}`)
            .then(() => {
                alert("System user deleted");
                axios.get("http://localhost:8070/users/getallusers")
                    .then(response => {
                        setUsers(response.data);
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            })
            .catch((err) => {
                alert(err);
            });
    }

    function handleEdit(id) {
        setEditedUser(id);
    }

    function handleInputChange(event, key) {
        const updatedUsers = [...users];
        const userIndex = updatedUsers.findIndex(user => user._id === key);
        updatedUsers[userIndex][event.target.name] = event.target.value;
        setUsers(updatedUsers);
    }

    function saveUpdatedData(id) {
        const userToUpdate = users.find(user => user._id === id);
        
        // Phone number validation
        // if (!/^\d{10}$/.test(userToUpdate.phone_number)) {
        //     alert("Please enter a valid 10-digit phone number");
        //     return;
        // }
        
        updateUser(id, userToUpdate);
        setEditedUser(null);
    }

    function generatePDF() {
        // Create new jsPDF instance
        const doc = new jsPDF();

        // Add a title to the PDF
        doc.text("System Users Report", 10, 10);

        // Prepare table data
        const tableData = users.map(user => [user.name, user.address, user.phoneNumber, user.email, user.password, user.user_Type]);

        // Add auto table plugin
        doc.autoTable({
            head: [[ 'Name', 'Address', 'Phone Number', 'Email','Password', 'User Type']],
            body: tableData,
        });

        // Save the PDF
        doc.save("system_users_report.pdf");
    }

    // Function to filter system users based on search query using lodash
    const filteredUsers = _.filter(users, (user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <>
        <AdminHeader/>
        <div className='dv1'>
            
            <input style={{marginTop:"5vh",marginLeft:"5vw",width:"15vw"}}
                type="text"
                placeholder="Search by Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} /></div><div className="table-wrapper">

                
                <div className="table-container">
                <h1 className='h1'>Users</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Phone Number</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>User Type</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user._id}>
                                    <td>
                                        {editedUser === user._id ? (
                                            <input type="text" name="name" value={user.name} onChange={(event) => handleInputChange(event, user._id)} />
                                        ) : (
                                            user.name
                                        )}
                                    </td>
                                    <td>
                                        {editedUser === user._id ? (
                                            <input type="text" name="address" value={user.address} onChange={(event) => handleInputChange(event, user._id)} />
                                        ) : (
                                            user.address
                                        )}
                                    </td>
                                    <td>
                                        {editedUser === user._id ? (
                                            <input type="text" name="phoneNumber" value={user.phoneNumber} onChange={(event) => handleInputChange(event, user._id)} />
                                        ) : (
                                            user.phoneNumber
                                        )}
                                    </td>
                                    <td>
                                        {editedUser === user._id ? (
                                            <input type="text" name="email" value={user.email} onChange={(event) => handleInputChange(event, user._id)} />
                                        ) : (
                                            user.email
                                        )}
                                    </td>
                                    <td>
                                        {editedUser === user._id ? (
                                            <input type="text" name="password" value={user.password} onChange={(event) => handleInputChange(event, user._id)} />
                                        ) : (
                                            user.password
                                        )}
                                    </td>
                                    <td>
                                        {editedUser === user._id ? (
                                            <select name="user_Type" value={user.user_Type} onChange={(event) => handleInputChange(event, user._id)}>
                                                <option value="Administrator">Administrator</option>
                                                <option value="User">User</option>
                                                <option value="Guest">Guest</option>
                                            </select>
                                        ) : (
                                            user.user_Type
                                        )}
                                    </td>
                                    <td>
                                        {editedUser === user._id ? (
                                            <button className="btn btn-update" onClick={() => saveUpdatedData(user._id)}>Save</button>
                                        ) : (
                                            <button className="btn btn-update" onClick={() => handleEdit(user._id)}>Edit</button>
                                        )}
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => deleteUser(user._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={{marginTop:"10px"}}>
                    <button className="btn btn-primary" onClick={generatePDF}>Generate PDF</button>
                </div>
                </div>
                
            </div>
            <Footer/></>
    );
};

export default AllUsers;

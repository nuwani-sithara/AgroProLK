import React, { useState, useEffect } from "react";
import './styles/AddUser.css';
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function AddUser() {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [existingUsers, setExistingUsers] = useState([]);

  // Fetch existing users for email validation
  useEffect(() => {
    axios
      .get("http://localhost:8070/users/getallusers")
      .then((res) => {
        setExistingUsers(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  function sendData(e) {
    e.preventDefault();

    // Email uniqueness check
    if (existingUsers.some(user => user.email === email)) {
      alert("Email already exists. Please choose a different Email Address.");
      return;
    }

    const newUser = {
      name,
      address,
      phoneNumber,
      email,
      password,
      user_Type: "User" // Default user type set to 'User'
    };

    // Post request to add a new user
    axios.post("http://localhost:8070/users/adduser", newUser)
      .then(() => {
        alert("User added successfully!");

        // Clear form fields after successful submission
        setName("");
        setAddress("");
        setPhoneNumber("");
        setEmail("");
        setPassword("");

        // Redirect to home or any other page
        navigate("/");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="fm1">
      <br />
      <h1 style={{ textAlign: "center" }}>Sign Up</h1>
      <form onSubmit={sendData}>
        <div className="dv1">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name:</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="address" className="form-label">Permanent Address:</label>
            <input
              type="text"
              className="form-control"
              id="address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">Phone Number:</label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              pattern="[0-9]{10}"
              title="Please enter a 10-digit phone number"
              placeholder="Enter Phone number (10 digits)"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter a secure password"
            />
          </div>

          <div className="dv-center">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}

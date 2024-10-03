import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/UserProfile.css"; 
import AdminHeader from "./AdminHeader";
import Header from "./Header";

export default function UserProfile({ userEmail }) {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  // Use localStorage to get the userEmail if it's not passed as a prop
  useEffect(() => {
    const email = userEmail || localStorage.getItem('userEmail');

    if (email) {
      axios
        .get(`http://localhost:8070/users/findByEmail/${email}`)
        .then((res) => {
          if (res.data && res.data.user) {
            setUser(res.data.user);
          } else {
            alert("User not found");
          }
        })
        .catch((err) => {
          console.error("Error fetching user data:", err);
        });
    } else {
      navigate("/"); // Redirect to login if no email is found
    }
  }, [userEmail, navigate]);

  function handleUpdate(e) {
    e.preventDefault();

    axios
      .put(`http://localhost:8070/users/updateUser/${user._id}`, user)
      .then(() => {
        alert("Profile updated successfully");
        setIsEditing(false);
      })
      .catch((err) => {
        alert("Error updating profile");
        console.error(err);
      });
  }

  function handleDelete() {
    axios
      .delete(`http://localhost:8070/users/deleteUser/${user._id}`)
      .then(() => {
        alert("Account deleted");
        localStorage.removeItem("user");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("isLoggedIn");
        navigate("/");
      })
      .catch((err) => {
        alert("Error deleting account");
        console.error(err);
      });
  }

  const renderHeader = () => {
    switch (user.user_Type) {
      case "Administrator":
        return <AdminHeader />;
      case "Manager":
      case "User":
      default:
        return <Header />;
    }
  };

  return (
    <div>
      {renderHeader()}
      <div className="profile-container">
        <h1 className="profile-title">Profile</h1>
        {!isEditing ? (
          <>
            <div className="profile-info">
              <div className="profile-row">
                <label>Full Name:</label>
                <span>{user.name}</span>
              </div>
              <div className="profile-row">
                <label>Permanent Address:</label>
                <span>{user.address}</span>
              </div>
              <div className="profile-row">
                <label>Phone Number:</label>
                <span>{user.phoneNumber}</span>
              </div>
              <div className="profile-row">
                <label>Email:</label>
                <span>{user.email}</span>
              </div>
            </div>
            <div className="profile-actions">
              <button className="btn-primary" onClick={() => setIsEditing(true)}>Edit Profile</button>
              <button className="btn-danger" onClick={handleDelete}>Delete Account</button>
            </div>
          </>
        ) : (
          <form onSubmit={handleUpdate} className="profile-form">
            <div className="form-group">
              <label htmlFor="name">Full Name:</label>
              <input
                type="text"
                id="name"
                value={user.name || ""}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Permanent Address:</label>
              <input
                type="text"
                id="address"
                value={user.address || ""}
                onChange={(e) => setUser({ ...user, address: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="text"
                id="phoneNumber"
                value={user.phoneNumber || ""}
                onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                id="email"
                value={user.email || ""}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={user.password || ""}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>

            <div className="profile-actions">
              <button type="submit" className="btn-primary">Save Changes</button>
              <button type="button" className="btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

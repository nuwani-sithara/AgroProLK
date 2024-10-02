import React, { useState, useEffect } from "react";
import axios from 'axios';
import './styles/Login.css';
import { useNavigate } from "react-router-dom";

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const[,setUserEmail] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8070/users/getallusers")
            .then(response => {
                setUsers(response.data);
                console.log("Fetched users data:", response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Login form submitted");
        
        const user = users.find(user => user.email === email);
        
        if (!user) {
            setError("Invalid Email");
            console.log("Invalid Email");
            return;
        }

        if (user.password !== password) {
            setError("Incorrect Password");
            console.log("Incorrect Password");
            return;
        }

        // Call the onLoginSuccess function to update the state in App.js
        onLoginSuccess(user.email);

        // Navigate based on user type
        switch (user.user_Type) {
            case "Administrator":
                navigate("/AdminHome", { state: { userEmail: user.email } });
                break;
            case "Manager":
            case "User":
            default:
                navigate("/UserHome", { state: { userEmail: user.email } });
        }
    };

    return (
        <div style={{ backgroundColor: '#000', minHeight: '100vh', padding: '50px 0' }}>
        <div className="login-container" style={{ backgroundColor: 'white'}}>
            <h2 style={{ textAlign: "center", color: "black"}}>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div style={{textAlign:"center"}}><button type="submit">Login</button></div>
            </form>
            <br/>
            If you haven't account Please <a href="/AddUser">Sign Up</a>
        </div>
        </div>
    );
};

export default Login;

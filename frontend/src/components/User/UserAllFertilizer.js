import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header";
import Footer from "../Footer";
import UserFertilizerCard from "./UserFertilizerCard";

export default function UserAllFertilizer() {
    const [fertilizers, setFertilizers] = useState([]);

    useEffect(() => {
        getFertilizers();
    }, []);

    const getFertilizers = () => {
        axios.get("http://localhost:8070/fertilizer/allfertilizer")
            .then((res) => {
                setFertilizers(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    };

    return (
        <>
        <Header/>
        <div className="bg" style={{ backgroundColor: 'rgb(24, 24, 24)', // Corrected property name
    backgroundRepeat: 'no-repeat', // Corrected property name and value
    backgroundSize: 'cover'}}>

            <pre></pre>
            <pre></pre>
            <pre></pre>
            <pre></pre>
            <pre></pre>
            <pre></pre>
            <pre></pre>
            <pre></pre>
        <div className="container mt-4" style={{ marginLeft: 'auto', marginRight: 'auto', marginBottom: '95px'}}>
            <div className="row">
                {fertilizers.map((fertilizer) => (
                    <div key={fertilizer._id} className="col-md-6 mb-3">
                        <UserFertilizerCard fertilizer={fertilizer} /> 
                    </div>
                ))}
            </div>
        </div>
        </div>
        <Footer/>
        </>
    );
}

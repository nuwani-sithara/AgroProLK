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
        <><Header/>
         <div style={{background:'#181818'}}>
         <div className="bg" style={{ backgroundColor: 'rgb(24, 24, 24)', 
            backgroundRepeat: 'no-repeat', 
            backgroundSize: 'cover'}}></div>
        <div className="container" style={{ padding: '20px', marginTop: '95px', marginLeft: 'auto', marginRight: 'auto'}}>
            <div className="row" style={{marginTop: '95px'}}>
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
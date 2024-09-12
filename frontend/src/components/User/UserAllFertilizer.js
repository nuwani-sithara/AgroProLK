import React, { useState, useEffect } from "react";
import axios from "axios";
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
       
        <div className="container" style={{ padding: '20px', marginTop: '195px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '95px'}}>
            <div className="row">
                {fertilizers.map((fertilizer) => (
                    <div key={fertilizer._id} className="col-md-6 mb-3">
                        <UserFertilizerCard fertilizer={fertilizer} /> 
                    </div>
                ))}
            </div>
        </div>
        
    );
}

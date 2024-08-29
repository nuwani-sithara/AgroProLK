import React, {useState,useEffect} from "react";
import axios from "axios";

export default function AllFertilizers(){

    const [fertilizers,setFertilizers] = useState([]);

    useEffect(() => {
        function getFertilizers() {
            axios.get("http://localhost:8070/fertilizer/").then((res) => {
                setFertilizers(res.data);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getFertilizers();
    }, [])

    return (
        <div>
            <h1>All Fertilizers</h1>
        </div>
    )
}
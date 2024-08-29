import React, {useState} from "react";
import axios from "axios";

export default function AddFertilizer(){

    const [fName,setfName] = useState("");
    const [disName,setdisName] = useState("");
    const [soilColor,setsoilColor] = useState("");
    const [nitrogen,setnitrogen] = useState("");
    const [phosphorus,setphosphorus] = useState("");
    const [potassium,setpotassium] = useState("");
    const [pH,setpH] = useState("");
    const [rainfall,setrainfall] = useState("");
    const [temperature,settemperature] = useState("");
    const [crop,setcrop] = useState("");
    
    function sendFerData(e){
        e.preventDefault();
        
        const newFertilizer ={
            fName ,
            disName ,
            soilColor ,
            nitrogen ,
            phosphorus ,
            potassium ,
            pH ,
            rainfall ,
            temperature ,
            crop  
        }
       
        axios.post("http://localhost:8070/fertilizer/addfertilizer",newFertilizer).then(() => {
            alert("Fertilizers Added")

        }).catch((err) => {
            alert("Fertilizers not added")
        })
    }

    return(
        <div className="container mt-5">
            <div className="card p-3 shadow-sm">
                <h3 className="text-center mb-3">Add Fertilizer Details</h3>
                <form onSubmit={sendFerData}>
                    <div className="form-group row justify-content-center">
                        <label htmlFor="fName" className="col-sm-4 col-form-label small-label">Fertilizer Name</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control form-control-sm" id="fName" placeholder="Enter Fertilizer Name" onChange={(e) => {
                                setfName(e.target.value);
                            }}/>
                        </div>
                    </div>

                    <div className="form-group row justify-content-center">
                        <label htmlFor="disName" className="col-sm-4 col-form-label small-label">District Name</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control form-control-sm" id="disName" placeholder="Enter District Name" onChange={(e) => {
                                setdisName(e.target.value);
                            }}/>
                        </div>
                    </div>

                    <div className="form-group row justify-content-center">
                        <label htmlFor="soilColor" className="col-sm-4 col-form-label small-label">Soil Colour</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control form-control-sm" id="soilColor" placeholder="Enter Soil Colour" onChange={(e) => {
                                setsoilColor(e.target.value);
                            }}/>
                        </div>
                    </div>

                    <div className="form-group row justify-content-center">
                        <label htmlFor="nitrogen" className="col-sm-4 col-form-label small-label">Nitrogen</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control form-control-sm" id="nitrogen" placeholder="Enter Nitrogen Level" onChange={(e) => {
                                setnitrogen(e.target.value);
                            }}/>
                        </div>
                    </div>

                    <div className="form-group row justify-content-center">
                        <label htmlFor="phosphorus" className="col-sm-4 col-form-label small-label">Phosphorus</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control form-control-sm" id="phosphorus" placeholder="Enter Phosphorus Level" onChange={(e) => {
                                setphosphorus(e.target.value);
                            }}/>
                        </div>
                    </div>

                    <div className="form-group row justify-content-center">
                        <label htmlFor="potassium" className="col-sm-4 col-form-label small-label">Potassium</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control form-control-sm" id="potassium" placeholder="Enter Potassium Level" onChange={(e) => {
                                setpotassium(e.target.value);
                            }}/>
                        </div>
                    </div>

                    <div className="form-group row justify-content-center">
                        <label htmlFor="pH" className="col-sm-4 col-form-label small-label">pH Value</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control form-control-sm" id="pH" placeholder="Enter pH Value" onChange={(e) => {
                                setpH(e.target.value);
                            }}/>
                        </div>
                    </div>

                    <div className="form-group row justify-content-center">
                        <label htmlFor="rainfall" className="col-sm-4 col-form-label small-label">Rainfall</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control form-control-sm" id="rainfall" placeholder="Enter Rainfall" onChange={(e) => {
                                setrainfall(e.target.value);
                            }}/>
                        </div>
                    </div>

                    <div className="form-group row justify-content-center">
                        <label htmlFor="temperature" className="col-sm-4 col-form-label small-label">Temperature</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control form-control-sm" id="temperature" placeholder="Enter Temperature" onChange={(e) => {
                                settemperature(e.target.value);
                            }}/>
                        </div>
                    </div>

                    <div className="form-group row justify-content-center">
                        <label htmlFor="crop" className="col-sm-4 col-form-label small-label">Crop</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control form-control-sm" id="crop" placeholder="Enter Crop" onChange={(e) => {
                                setcrop(e.target.value);
                            }}/>
                        </div>
                    </div>

                    <div className="form-group row justify-content-center">
                        <div className="col-sm-5">
                            <button type="submit" className="btn btn-success btn-sm btn-block mt-3">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}


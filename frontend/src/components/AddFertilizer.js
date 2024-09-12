import React, { useState } from "react";
import axios from "axios";

export default function AddFertilizer() {
    const [fName, setfName] = useState("");
    const [disName, setdisName] = useState("");
    const [soilColor, setsoilColor] = useState("");
    const [nitrogen, setnitrogen] = useState("");
    const [phosphorus, setphosphorus] = useState("");
    const [potassium, setpotassium] = useState("");
    const [pH, setpH] = useState("");
    const [rainfall, setrainfall] = useState("");
    const [temperature, settemperature] = useState("");
    const [crop, setcrop] = useState("");
    const [price, setprice] = useState("");

    // State for error messages for each field
    const [errorMessages, setErrorMessages] = useState({
        disName: "",
        soilColor: "",
        crop: "",
        nitrogen: "",
        phosphorus: "",
        potassium: "",
        pH: "",
        rainfall: "",
        temperature: "",
        price: ""
    });

    // Validation function
    const validateInputs = () => {
        // Reset error messages
        setErrorMessages({
            disName: "",
            soilColor: "",
            crop: "",
            nitrogen: "",
            phosphorus: "",
            potassium: "",
            pH: "",
            rainfall: "",
            temperature: "",
            price: ""
        });

        let valid = true;

        // Validate string inputs
        if (!disName) {
            setErrorMessages(prev => ({ ...prev, disName: "District Name is required." }));
            valid = false;
        }
        if (!soilColor) {
            setErrorMessages(prev => ({ ...prev, soilColor: "Soil Colour is required." }));
            valid = false;
        }
        if (!crop) {
            setErrorMessages(prev => ({ ...prev, crop: "Crop is required." }));
            valid = false;
        }

        // Validate number inputs
        const numberFields = { nitrogen, phosphorus, potassium, pH, rainfall, temperature , price};
        for (const field in numberFields) {
            if (!numberFields[field] || isNaN(numberFields[field])) {
                setErrorMessages(prev => ({ ...prev, [field]: `${field.charAt(0).toUpperCase() + field.slice(1)} must be a valid number.` }));
                valid = false;
            }
        }

        // Additional validation rules
        if (temperature && Number(temperature) >= 50) {
            setErrorMessages(prev => ({ ...prev, temperature: "Temperature must be less than 50 degrees." }));
            valid = false;
        }

        if (rainfall && Number(rainfall) <= 0) {
            setErrorMessages(prev => ({ ...prev, rainfall: "Rainfall must be greater than zero." }));
            valid = false;
        }

        return valid;
    };

    function sendFerData(e) {
        e.preventDefault();

        if (!validateInputs()) {
            return; 
        }

        const newFertilizer = {
            fName,
            disName,
            soilColor,
            nitrogen,
            phosphorus,
            potassium,
            pH,
            rainfall,
            temperature,
            crop,
            price
        };

        axios.post("http://localhost:8070/fertilizer/addfertilizer", newFertilizer)
            .then(() => {
                alert("Fertilizers Added");
                setErrorMessages({}); // Clear error messages on success
            })
            .catch((err) => {
                setErrorMessages(prev => ({ ...prev, general: "Fertilizers not added" })); // Set general error message on failure
            });
    }

    return (
        <div className="container" style={{ maxWidth: '800px', margin: 'auto', padding: '20px' ,marginTop: '195px',marginBottom:'95px'}}>
            <div className="card" style={{ padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', borderRadius: '5px' }}>
                <h3 className="text-center" style={{ marginBottom: '20px' }}>Add Fertilizer Details</h3>
                {errorMessages.general && <div className="alert alert-danger">{errorMessages.general}</div>} {/* Display general error message */}
                <form onSubmit={sendFerData}>
                    <div className="row">
                        {[
                            { label: "Fertilizer Name", state: fName, setter: setfName, placeholder: "Enter Fertilizer Name" },
                            { label: "District Name", state: disName, setter: setdisName, placeholder: "Enter District Name", error: errorMessages.disName },
                            { label: "Soil Colour", state: soilColor, setter: setsoilColor, placeholder: "Enter Soil Colour", error: errorMessages.soilColor },
                            { label: "Nitrogen", state: nitrogen, setter: setnitrogen, placeholder: "Enter Nitrogen Level", error: errorMessages.nitrogen },
                            { label: "Phosphorus", state: phosphorus, setter: setphosphorus, placeholder: "Enter Phosphorus Level", error: errorMessages.phosphorus },
                            { label: "Potassium", state: potassium, setter: setpotassium, placeholder: "Enter Potassium Level", error: errorMessages.potassium },
                            { label: "pH Value", state: pH, setter: setpH, placeholder: "Enter pH Value", error: errorMessages.pH },
                            { label: "Rainfall", state: rainfall, setter: setrainfall, placeholder: "Enter Rainfall", error: errorMessages.rainfall },
                            { label: "Temperature", state: temperature, setter: settemperature, placeholder: "Enter Temperature", error: errorMessages.temperature },
                            { label: "Crop", state: crop, setter: setcrop, placeholder: "Enter Crop", error: errorMessages.crop },
                            { label: "Price", state: price, setter: setprice, placeholder: "Enter Price", error: errorMessages.price },
                        ].map((input, index) => (
                            <div className="col-sm-6" key={index} style={{ marginBottom: '15px' }}>
                                <div className="form-group">
                                    <label className="col-form-label small-label">{input.label}</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        placeholder={input.placeholder}
                                        value={input.state}
                                        onChange={(e) => input.setter(e.target.value)}
                                        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                                    />
                                    {input.error && <small className="text-danger">{input.error}</small>} {/* Display error message for the field */}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="form-group row justify-content-center">
                        <div className="col-sm-5">
                            <button type="submit" className="btn  btn-sm btn-block" style={{ marginTop: '20px' ,background:" rgba(0, 0, 0, 0.7)",color: "#6cff52"}}>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

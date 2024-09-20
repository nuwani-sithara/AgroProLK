import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateFertilizer() {
    const { id } = useParams(); // Get fertilizer ID from URL params
    const navigate = useNavigate();

    const [fertilizer, setFertilizer] = useState({
        fName: "",
        disName: "",
        soilColor: "",
        nitrogen: "",
        phosphorus: "",
        potassium: "",
        pH: "",
        rainfall: "",
        temperature: "",
        crop: "",
        price: ""
    });

    const [errorMessages, setErrorMessages] = useState({});

    useEffect(() => {
        // Fetch fertilizer details by ID
        axios.get(`http://localhost:5000/fertilizer/get/${id}`)
            .then(res => {
                setFertilizer(res.data.fertilizer);
            })
            .catch(err => {
                console.error(err);
                alert("Failed to fetch fertilizer details");
            });
    }, [id]);

    const validateInputs = () => {
        setErrorMessages({});
        let valid = true;

        if (!fertilizer.disName) {
            setErrorMessages(prev => ({ ...prev, disName: "District Name is required." }));
            valid = false;
        }
        if (!fertilizer.soilColor) {
            setErrorMessages(prev => ({ ...prev, soilColor: "Soil Colour is required." }));
            valid = false;
        }
        if (!fertilizer.crop) {
            setErrorMessages(prev => ({ ...prev, crop: "Crop is required." }));
            valid = false;
        }

        const numberFields = ['nitrogen', 'phosphorus', 'potassium', 'pH', 'rainfall', 'temperature', 'price'];
        for (const field of numberFields) {
            if (!fertilizer[field] || isNaN(fertilizer[field])) {
                setErrorMessages(prev => ({ ...prev, [field]: `${field.charAt(0).toUpperCase() + field.slice(1)} must be a valid number.` }));
                valid = false;
            }
        }

        if (fertilizer.temperature && Number(fertilizer.temperature) >= 50) {
            setErrorMessages(prev => ({ ...prev, temperature: "Temperature must be less than 50 degrees." }));
            valid = false;
        }

        if (fertilizer.rainfall && Number(fertilizer.rainfall) <= 0) {
            setErrorMessages(prev => ({ ...prev, rainfall: "Rainfall must be greater than zero." }));
            valid = false;
        }

        return valid;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFertilizer({ ...fertilizer, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateInputs()) {
            return;
        }

        axios.put(`http://localhost:5000/fertilizer/updatefertilizer/${id}`, fertilizer)
            .then(() => {
                alert("Fertilizer updated successfully");
                navigate("/"); // Redirect to the list or home page after successful update
            })
            .catch((err) => {
                console.error(err);
                alert("Failed to update fertilizer");
            });
    };

    return (
        <div className="container" style={{ maxWidth: '800px', margin: 'auto', padding: '20px', marginTop: '95px', marginBottom: '95px', background: "green" }}>
            <div className="card" style={{ padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', borderRadius: '5px' }}>
                <h3 className="text-center" style={{ marginBottom: '20px' }}>Update Fertilizer Details</h3>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        {[
                            { label: "Fertilizer Name", name: "fName", value: fertilizer.fName, placeholder: "Enter Fertilizer Name" },
                            { label: "District Name", name: "disName", value: fertilizer.disName, placeholder: "Enter District Name", error: errorMessages.disName },
                            { label: "Soil Colour", name: "soilColor", value: fertilizer.soilColor, placeholder: "Enter Soil Colour", error: errorMessages.soilColor },
                            { label: "Nitrogen", name: "nitrogen", value: fertilizer.nitrogen, placeholder: "Enter Nitrogen Level", error: errorMessages.nitrogen },
                            { label: "Phosphorus", name: "phosphorus", value: fertilizer.phosphorus, placeholder: "Enter Phosphorus Level", error: errorMessages.phosphorus },
                            { label: "Potassium", name: "potassium", value: fertilizer.potassium, placeholder: "Enter Potassium Level", error: errorMessages.potassium },
                            { label: "pH Value", name: "pH", value: fertilizer.pH, placeholder: "Enter pH Value", error: errorMessages.pH },
                            { label: "Rainfall", name: "rainfall", value: fertilizer.rainfall, placeholder: "Enter Rainfall", error: errorMessages.rainfall },
                            { label: "Temperature", name: "temperature", value: fertilizer.temperature, placeholder: "Enter Temperature", error: errorMessages.temperature },
                            { label: "Crop", name: "crop", value: fertilizer.crop, placeholder: "Enter Crop", error: errorMessages.crop },
                            { label: "Price", name: "price", value: fertilizer.price, placeholder: "Enter Price", error: errorMessages.price }
                        ].map((input, index) => (
                            <div className="col-sm-6" key={index} style={{ marginBottom: '15px' }}>
                                <div className="form-group">
                                    <label className="col-form-label small-label">{input.label}</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        name={input.name}
                                        placeholder={input.placeholder}
                                        value={input.value}
                                        onChange={handleInputChange}
                                        style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                                    />
                                    {input.error && <small className="text-danger">{input.error}</small>}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="form-group row justify-content-center">
                        <div className="col-sm-5">
                            <button type="submit" className="btn btn-success btn-sm btn-block" style={{ marginTop: '20px'}}>Update</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

import React from "react";
import { useNavigate } from "react-router-dom"; 
import cabage from "../Assets/cabage.jpeg";
import carrot from "../Assets/carrot.jpeg";
import chilli from "../Assets/chilli.jpeg";
import cinemon from "../Assets/cinemon.jpeg";
import coconut from "../Assets/coconut.jpeg";
import fruits from "../Assets/fruits.jpeg";
import groundnut from "../Assets/groundnut.jpeg";
import maize from "../Assets/maize.jpeg";
import onion from "../Assets/onion.jpeg";
import ornamental from "../Assets/ornamental.jpeg";
import potato from "../Assets/potato.jpeg";
import pulses from "../Assets/pulses.jpeg";
import rice from "../Assets/rice.jpeg";
import rubber from "../Assets/rubber.jpeg";
import sorghum from "../Assets/sorghum.jpeg";
import tea from "../Assets/tea.jpeg";
import tomato from "../Assets/tomato.jpeg";
import vegetable from "../Assets/vegetable.jpeg";
import watermelon from "../Assets/watermelon.jpeg";
import defaultpic from "../Assets/defaultpic.jpeg";

const cropImages = {
  Cabage: cabage,
  Carrot: carrot,
  Chillie: chilli,
  Cinemon: cinemon,
  Coconut: coconut,
  Fruits: fruits,
  Groundnut: groundnut,
  Maize: maize,
  Onion: onion,
  Ornamental: ornamental,
  Potato: potato,
  Pulses: pulses,
  Rice: rice,
  Rubber: rubber,
  Sorghum: sorghum,
  Tea: tea,
  Tomato: tomato,
  Vegetable: vegetable,
  Watermelon: watermelon,
};

export default function FertilizerCard({ fertilizer, onDelete }) {
  const navigate = useNavigate(); 

  const handleUpdateClick = () => {
    navigate(`/updatefertilizer/${fertilizer._id}`); 
  };

  const handleDeleteClick = () => {
    onDelete(fertilizer._id); 
  };

  return (
    
    <div
      className="card mb-4 shadow-sm"
      style={{ borderRadius: "15px", overflow: "hidden", margin: "10px" ,background:"white"}}
    >
      <div className="row no-gutters">
        <div
          className="col-md-4 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <div
            style={{
              width: "150px",
              height: "150px",
              overflow: "hidden",
              borderRadius: "50%",
              border: "3px solid #343a40",
            }}
          >
            <img
              src={cropImages[fertilizer.crop] || defaultpic}
              alt={fertilizer.crop}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title text-center font-weight-bold">
              {fertilizer.crop}
            </h5>
            <div className="card-text">
              <p>
                <strong>District:</strong> {fertilizer.disName || 'N/A'}
              </p>
              <p>
                <strong>Soil Color:</strong> {fertilizer.soilColor || 'N/A'}
              </p>
              <p>
                <strong>Nitrogen:</strong> {fertilizer.nitrogen || 'N/A'}
              </p>
              <p>
                <strong>Phosphorus:</strong> {fertilizer.phosphorus || 'N/A'}
              </p>
              <p>
                <strong>Potassium:</strong> {fertilizer.potassium || 'N/A'}
              </p>
              <p>
                <strong>pH Value:</strong> {fertilizer.pH || 'N/A'}
              </p>
              <p>
                <strong>Rainfall:</strong> {fertilizer.rainfall || 'N/A'}
              </p>
              <p>
                <strong>Temperature:</strong> {fertilizer.temperature || 'N/A'}
              </p>
              <p>
                <strong>Fertilizer Name:</strong>{" "}
                <span 
                  className="badge badge-success" 
                  style={{
                    border: "2px solid #28a745",  
                    padding: "0.25rem 0.5rem",     
                    borderRadius: "0.25rem",   
                    color:"black"     
                  }}
                >
                  {fertilizer.fName || 'N/A'}
                </span>
              </p>
              <p>
                <strong>Price:</strong> {fertilizer.price || 'N/A'}
              </p>
            </div>
            <div className="d-flex justify-content-between mt-3"
              style={{ width: "100%" }} >
              <button
                onClick={handleUpdateClick}
                className="btn btn-success mr-2"
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.7)", 
                  color: "#6cff52",
                  padding: "3px 8px", // Smaller padding
                  fontSize: "15px",   // Reduced font size
                  height: "45px",     // Reduced button height
                  width: "95px",      // Reduced button width
                  borderRadius: "5px" // Optional, adds roundness
                }}
              >
                Update
              </button>
              
              <button
                className="btn btn-success"
                style={{
                  backgroundColor: "white", 
                  color: "green", 
                  border: "2px solid green",
                  padding: "3px 8px",  // Smaller padding for a compact button
                  fontSize: "15px",    // Smaller font size
                  height: "45px",      // Reduced button height
                  width: "95px",       // Reduced button width
                  borderRadius: "5px"  // Optional for rounded corners
                }}
                onClick={handleDeleteClick}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

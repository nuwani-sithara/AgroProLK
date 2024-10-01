import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from "../Header";
import Footer from "../Footer";


export default function FertilizerCalculation() {
  const { id } = useParams(); 
  const navigate = useNavigate(); 
  const [fertilizer, setFertilizer] = useState(null);
  const [area, setArea] = useState(''); 
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    console.log("Fertilizer ID:", id);  
    axios.get(`http://localhost:8070/fertilizer/get/${id}`) 
      .then((res) => {
        setFertilizer(res.data.fertilizer);
        setLoading(false); 
      })
      .catch((err) => {
        setErrorMessage("Failed to fetch fertilizer details");
        setLoading(false);
      });
  }, [id]);
  
  const nitrogenContent = 0.30; 

  const calculateFertilizerNeeds = () => {
    if (fertilizer) {
      const totalNitrogenNeeded = fertilizer.nitrogen * area; 
      const totalFertilizerNeeded = totalNitrogenNeeded / nitrogenContent; 
      return totalFertilizerNeeded;
    }
    return 0;
  };

  const calculateTotalPrice = () => {
    const requiredAmount = calculateFertilizerNeeds();
    const totalPrice = (requiredAmount * fertilizer.price) || 0; 
    return totalPrice.toFixed(2); 
  };

  const handleAreaChange = (e) => {
    const value = e.target.value;
    if (value === '' || (!isNaN(value) && Number(value) >= 0)) {
      setArea(value);
      setErrorMessage('');
    } else {
      setErrorMessage('Please add number only');
    }
  };

  const handlePlaceOrder = () => {
    const confirmation = window.confirm('Are you sure you want to place this order?');
    if (confirmation) {
      const totalFertilizerNeeded = calculateFertilizerNeeds();
      const totalPrice = calculateTotalPrice();

      axios.post('http://localhost:8070/api/orders', {
        product: fertilizer.fName, 
        quantity: totalFertilizerNeeded, 
        totalPrice: totalPrice 
      })
      .then((response) => {
        alert(`Order placed successfully on ${new Date(response.data.createdAt).toLocaleString()}!`);
        navigate('/orders');
      })
      .catch((error) => {
        alert('Failed to place order: ' + error.message);
      });
    }
  };
  
<<<<<<< HEAD
  if (loading) return <div>Loading...</div>; // Loading spinner
=======
  
  
  
  if (loading) return <div>Loading...</div>; 
>>>>>>> e7ddff201e99517085cd8955bca5f05dbb2028fc

  if (errorMessage) return <div style={{ color: 'red' }}>{errorMessage}</div>; 

  return (
    <><Header/>
    <div style={{ 
      padding: '40px', 
      background: 'linear-gradient(120deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))', 
      borderRadius: '12px', 
      border: '2px solid #28a745',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', 
      maxWidth: '600px', 
      margin: 'auto', 
      marginTop: '195px', 
      marginBottom: '95px' 
    }}>
      <h1 style={{ color: '#fff', marginBottom: '30px', fontSize: '26px', fontWeight: 'bold', textAlign: 'center' }}>Fertilizer Calculation</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <p style={{ fontSize: '18px', color: '#e4e4e4' }}>Crop: <strong>{fertilizer.crop}</strong></p>
        <p style={{ fontSize: '18px', color: '#e4e4e4' }}>Fertilizer Name: <strong>{fertilizer.fName}</strong></p>
        <p style={{ fontSize: '18px', color: '#e4e4e4' }}>Price per unit: <strong>Rs. {fertilizer.price.toFixed(2)}</strong></p>
        <p style={{ fontSize: '18px', color: '#e4e4e4' }}>Amount of fertilizer needed: <strong>{calculateFertilizerNeeds().toFixed(2)} units</strong></p>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <label style={{ fontSize: '16px', color: '#e4e4e4', marginRight: '20px' }}>
          Enter the size of the land (in acres):
        </label>
        <input
          type="number"
          value={area}
          onChange={handleAreaChange} 
          placeholder="Enter area in acres"
          style={{
            padding: '10px', 
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '6px',
            width: '200px', 
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            outline: 'none',
            transition: 'border-color 0.3s',
          }}
          onFocus={(e) => e.target.style.borderColor = '#28a745'} 
          onBlur={(e) => e.target.style.borderColor = '#ccc'} 
        />
      </div>

      {errorMessage && <p style={{ color: 'red', fontSize: '14px' }}>{errorMessage}</p>}
      
      <div style={{
        padding: '20px',
        backgroundColor: '#f9f9f9', 
        border: '2px solid #28a745', 
        borderRadius: '8px',
        marginTop: '20px',
        textAlign: 'center',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px', 
        marginLeft: 'auto', 
        marginRight: 'auto', 
      }}>
        <h2 style={{ color: '#333', margin: '0', fontSize: '24px', fontWeight: '600' }}>Total Price</h2>
        <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#28a745' }}>Rs. {calculateTotalPrice()}</p>
        <p style={{ fontSize: '14px', color: '#333', marginTop: '5px' }}>Calculated based on the area and fertilizer requirements</p>
      </div>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <button
          onClick={handlePlaceOrder}
          style={{
            padding: '10px 20px', 
            backgroundColor: '#28a745', 
            color: 'white',
            fontSize: '16px',
            border: 'none',
            borderRadius: '6px', 
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            width: 'auto', 
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#218838'} 
          onMouseLeave={(e) => e.target.style.backgroundColor = '#28a745'} 
          disabled={!area || isNaN(area) || area <= 0}
        >
          Place Order
        </button>
      </div>
<<<<<<< HEAD
    </div>
  );
=======
    </div>
 <Footer/>
 </>
  );
>>>>>>> e7ddff201e99517085cd8955bca5f05dbb2028fc
}

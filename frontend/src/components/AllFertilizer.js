import React, { useState, useEffect } from "react";
import axios from "axios";
import FertilizerCard from "./FertilizerCard";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import Footer from "./Footer";

export default function AllFertilizer() {
    const [fertilizers, setFertilizers] = useState([]);
    const navigate = useNavigate();

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

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this fertilizer?")) {
            axios.delete(`http://localhost:8070/fertilizer/deletefertilizer/${id}`)
                .then((res) => {
                    alert(res.data.status);
                    // Update the state to remove the deleted fertilizer
                    setFertilizers(fertilizers.filter(fertilizer => fertilizer._id !== id));
                })
                .catch((err) => {
                    alert(err.message);
                });
        }
    };

    // PDF generation function
    const generatePDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 20; 
        const availableWidth = pageWidth - margin; 
        const numColumns = 10; 

        const fontSize = Math.max(8, Math.floor(availableWidth / numColumns / 10)); 
        doc.setFontSize(fontSize);
        doc.setTextColor(0, 100, 0); 
        doc.text("Fertilizer Report", 14, 16);

        autoTable(doc, {
            startY: 20,
            head: [['Crop', 'District', 'Soil Color', 'Nitrogen', 'Phosphorus', 'Potassium', 'pH', 'Rainfall', 'Temperature', 'Fertilizer Name' , 'Price']],
            body: fertilizers.map(fert => [
                fert.crop,
                fert.disName,
                fert.soilColor,
                fert.nitrogen,
                fert.phosphorus,
                fert.potassium,
                fert.pH,
                fert.rainfall,
                fert.temperature,
                fert.fName,
                fert.price
            ]),
            theme: 'grid',
            headStyles: {
                fillColor: [0, 128, 0], 
                textColor: [255, 255, 255], 
                fontSize: fontSize, 
                halign: 'center', 
            },
            styles: {
                fillColor: [240, 240, 240], 
                textColor: [0, 0, 0], 
                fontSize: fontSize, 
            },
            alternateRowStyles: {
                fillColor: [220, 220, 220], 
            },
            margin: { top: 30, right: 10, bottom: 10, left: 10 }, 
            columnStyles: {
                0: { cellWidth: 'auto' }, 
                1: { cellWidth: 'auto' }, 
                2: { cellWidth: 'auto' }, 
                3: { cellWidth: 'auto' }, 
                4: { cellWidth: 'auto' }, 
                5: { cellWidth: 'auto' }, 
                6: { cellWidth: 'auto' }, 
                7: { cellWidth: 'auto' }, 
                8: { cellWidth: 'auto' }, 
                9: { cellWidth: 'auto' }, 
                10: { cellWidth: 'auto' }, 
            },
            width: availableWidth, 
        });
        doc.save("fertilizer_report.pdf");
    }

    return (
        <><AdminHeader/>
        <div className="container" style={{ padding: '5px', marginTop: '195px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '95px',background:'#333'}}>
            <div className="row">
                {fertilizers.map((fertilizer) => (
                    <div key={fertilizer._id} className="col-md-6 mb-3">
                        <FertilizerCard fertilizer={fertilizer} onDelete={handleDelete} /> 
                    </div>
                ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
    <button
        className="btn btn-success"
        style={{
            backgroundColor: 'white',
            color: 'green',
            padding: '6px 12px',   // Reduced padding for a smaller button
            borderRadius: '5px',   // Slightly reduced border radius
            fontSize: '16px',      // Smaller font size
            fontWeight: 'bold',
            cursor: 'pointer',
            width:'250px'
          }}
        onClick={generatePDF}
    >
        Generate PDF Report
    </button>

    <button
        className="btn btn-primary"
        onClick={() => navigate("/addfertilizer")}
        style={{
            backgroundColor: '#414040',
            color: '#6cff52',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
            width:'250px'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#6c757d'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#495057'}
    >
        Add Fertilizer
    </button>
</div>

        </div>
        <Footer/>
        </>
    );
}




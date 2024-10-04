const mongoose = require('mongoose');

const fertilizerCalculationSchema = new mongoose.Schema({
  fertilizerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fertilizer',
    required: true,
  },
  fertilizerName: { 
    type: String, 
    required: true 
  },
  area: {
    type: Number,
    required: true,
  },
  totalFertilizerNeeded: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
 
});

const FertilizerCalculation = mongoose.model("FertilizerCalculation",fertilizerCalculationSchema);

module.exports = FertilizerCalculation;
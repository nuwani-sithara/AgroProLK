const express = require('express');
const router = express.Router();
const FertilizerCalculation = require('../models/fertilizerCalculation');

router.post('/calculate', async (req, res) => {
  try {
    const { fertilizerId, area, totalFertilizerNeeded, totalPrice } = req.body;

    const newCalculation = new FertilizerCalculation({
      fertilizerId,
      area,
      totalFertilizerNeeded,
      totalPrice,
    });

    await newCalculation.save();
    res.status(201).json(newCalculation);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save calculation', error });
  }
});

module.exports = router;

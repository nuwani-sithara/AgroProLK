const router = require("express").Router();
let Fertilizer = require("../models/newFertilizer");
const FertilizerCalculation = require('../models/fertilizerCalculation');



//insert fertilizer
router.route("/addfertilizer").post((req,res) => {

    const fName = req.body.fName;
    const disName = req.body.disName;
    const soilColor = req.body.soilColor;
    const nitrogen = Number(req.body.nitrogen);
    const phosphorus = Number(req.body.phosphorus);
    const potassium = Number(req.body.potassium);
    const pH = Number(req.body.pH);
    const rainfall = Number(req.body.rainfall);
    const temperature = Number(req.body.temperature);
    const crop = req.body.crop;
    const price = Number(req.body.price);

    const newFertilizer = new Fertilizer({

        fName ,
        disName ,
        soilColor ,
        nitrogen ,
        phosphorus ,
        potassium ,
        pH ,
        rainfall ,
        temperature ,
        crop ,
        price  

    })

    newFertilizer.save().then(() => {
        res.json("Fertilizer Added...")
    }).catch((err) => {
        console.log(err);
    })
})

//display fertilizer
// router.route("/allfertilizer").get((req,res) => {
router.route("/allfertilizer").get((req,res) => {
    Fertilizer.find().then((fertilizers) => {
        res.json(fertilizers)
    }).catch((err) => {
        console.log(err);
    })

})




// update fertilizer
router.route("/updatefertilizer/:ferid").put(async (req, res) => {
    let ferId = req.params.ferid;
    const { fName, disName, soilColor, nitrogen, phosphorus, potassium, pH, rainfall, temperature, crop, price } = req.body;

    const updateFertilizer = {
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

    try {
        const updated = await Fertilizer.findByIdAndUpdate(ferId, updateFertilizer, { new: true });
        res.status(200).json({ status: "Fertilizer updated successfully", fertilizer: updated });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "Error updating fertilizer", error: err.message });
    }
});


//delete fertilizer
router.route("/deletefertilizer/:ferid").delete(async (req,res) => {
    let ferId = req.params.ferid;

    await Fertilizer.findByIdAndDelete(ferId).then(() => {
        res.status(200).send({status: "Fertilizer deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete fertilizer", error: err.message});
    })
})

// router.route("/get/:ferid").get(async (req,res) => {
//     let ferId = req.params.ferid;
//     const fertilizer = await Fertilizer.findById(ferId).then((fertilizer) => {
//         res.status(200).send({status: "Fertilizer fetched",fertilizer})
//     }).catch((err) => {
//         console.log(err.message);
//         res.status(500).send({status: "Error with get fertilizer", error: err.message});
//     })
// })
router.route("/get/:ferid").get(async (req, res) => {
    let ferId = req.params.ferid;
    try {
        const fertilizer = await Fertilizer.findById(ferId);
        if (!fertilizer) return res.status(404).json({ status: "Fertilizer not found" });
        res.status(200).json({ status: "Fertilizer fetched", fertilizer });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: "Error fetching fertilizer", error: err.message });
    }
});

router.post('/calculate', async (req, res) => {
    try {
      const { fertilizerId, area, totalFertilizerNeeded, totalPrice } = req.body;
  
      // Fetch fertilizer details by fertilizerId to get the fertilizer name
      const fertilizer = await Fertilizer.findById(fertilizerId);
      if (!fertilizer) return res.status(404).json({ message: 'Fertilizer not found' });
  
      const newCalculation = new FertilizerCalculation({
        fertilizerId,
        fertilizerName: fertilizer.fName,
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
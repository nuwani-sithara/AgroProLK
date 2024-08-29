const router = require("express").Router();
let Fertilizer = require("../models/newFertilizer");

//insert fertilizer
router.route("/addfertilizer").post((req,re) => {

    const fName = req.body.fName;
    const disName = req.body.disName;
    const soilColor = req.body.soilColor;
    const nitrogen = Number(req.body.nitrogen);
    const phosphorus = Number(req.body.phosphorus);
    const potassium = Number(req.body.potassium);
    const pH = Number(req.body.pH);
    const rainfall = Number(req.body.rainfall);
    const temperature = Number(req.body.rainfall);
    const crop = req.body.crop;

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
        crop  

    })

    newFertilizer.save().then(() => {
        res.json("Fertilizer Added...")
    }).catch((err) => {
        console.log(err);
    })
})

//display fertilizer
router.route("/").get((req,res) => {
    Fertilizer.find().then((fertilizers) => {
        res.json(fertilizers)
    }).catch((err) => {
        console.log(err);
    })

})

//update fertilizer
router.route("/updatefertilizer/:ferid").put(async (req,res) => {
    let ferId = req.params.ferid;
    const {fName ,disName ,soilColor ,nitrogen ,phosphorus ,potassium ,pH ,rainfall,temperature ,crop} = req.body;

    const updateFertilizer = {
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

    const update = await Fertilizer.findByIdAndUpdate(ferId,updateFertilizer).then(() => {
        res.status(200).send({status: "Fertilizer updated..."})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    })
})

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

router.route("/get/:ferid").get(async (req,res) => {
    let ferId = req.params.ferid;
    const fertilizer = await Fertilizer.findById(ferId).then((fertilizer) => {
        res.status(200).send({status: "Fertilizer fetched",fertilizer})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get fertilizer", error: err.message});
    })
})
module.exports = router;
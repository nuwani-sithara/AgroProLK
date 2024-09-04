const router = require("express").Router();
let CropDetails = require("../models/CropDetails");

// Add Crop Details
router.route("/add-cropdetails").post((req,res)=>{
    
    const farmerName = req.body.farmerName;
    const date = req.body.date;
    const address = req.body.address;
    const phoneNumber = req.body.phoneNumber;
    const harvestedDate = req.body.harvestedDate;
    const cropType = req.body.cropType;
    const yieldAmount = Number(req.body.yieldAmount);
    const unitPrice = Number(req.body.unitPrice);

    const newCropdetails = new CropDetails({

        farmerName,
        date,
        address,
        phoneNumber,
        harvestedDate,
        cropType,
        yieldAmount,
        unitPrice

    })

    newCropdetails.save().then(()=>{
        res.json("Crop Deatils Added")
    }).catch((err)=>{
        console.log(err);
    })

})

// View Crop Details
router.route("/view-cropdetails").get((req,res)=>{

    CropDetails.find().then((cropdetails)=>{
        res.json(cropdetails)
    }).catch((err)=>{
        console.log(err)
    })

})

// Update Crop Details
router.route("/update-cropdetails/:cropid").put(async (req,res)=>{

    let cropId =req.params.cropid;
    const{farmerName, date, address, phoneNumber, harvestedDate, cropType, yieldAmount, unitPrice} = req.body;

    const updateCropdetails = {

        farmerName,
        date,
        address,
        phoneNumber,
        harvestedDate,
        cropType,
        yieldAmount,
        unitPrice

    }

    const update = await CropDetails.findByIdAndUpdate(cropId, updateCropdetails)
    .then(() => {
        res.status(200).send({status: "Crop Details Updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating crop details", error: err.message});
    })

})

// Delete Crop Details
router.route("/delete-cropdetails/:cropid").delete(async(req, res) => {

    let cropId =req.params.cropid;

    await CropDetails.findByIdAndDelete(cropId)
    .then(() => {
        res.status(200).send({status: "Crop Details Deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete crop details", error: err.message});
    })
})

// Fetch only one crop details
router.route("/get-cropdetails/:cropid").get(async (req,res) => {

    let cropId =req.params.cropid;
    await CropDetails.findById(cropId)
    .then((cropdetail) => {
        res.status(200).send({status: "Crop Details Fetched", cropdetail})
        
    }).catch(() => {
        console.log(err.message);
        res.status(500).send({status: "Error with get crop details", error: err.message});
    })
})

module.exports = router;
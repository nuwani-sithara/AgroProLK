const router = require("express").Router();
let YieldsDetails = require("../models/YieldsDetails");

// Add Crop Details
router.route("/add-yieldsdetails").post((req,res)=>{
    
    const farmerName = req.body.farmerName;
    const email = req.body.email;
    const date = req.body.date;
    const address = req.body.address;
    const phoneNumber = req.body.phoneNumber;
    const harvestedDate = req.body.harvestedDate;
    const cropType = req.body.cropType;
    const yieldAmount = Number(req.body.yieldAmount);
    const amountType = req.body.amountType;
    const unitPrice = Number(req.body.unitPrice);

    const newYieldsdetails = new YieldsDetails({

        farmerName,
        email,
        date,
        address,
        phoneNumber,
        harvestedDate,
        cropType,
        yieldAmount,
        amountType,
        unitPrice

    })

    newYieldsdetails.save().then(()=>{
        res.json("Yields Deatils Added")
    }).catch((err)=>{
        console.log(err);
    })

})

// View Crop Details
router.route("/view-yieldsdetails").get((req,res)=>{

    YieldsDetails.find().then((yieldsdetails)=>{
        res.json(yieldsdetails)
    }).catch((err)=>{
        console.log(err)
    })

})

// Update Crop Details
router.route("/update-yieldsdetails/:yieldsid").put(async (req,res)=>{

    let yieldsId =req.params.yieldsid;
    const{farmerName, email, date, address, phoneNumber, harvestedDate, cropType, yieldAmount, amountType, unitPrice} = req.body;

    const updateYieldsdetails = {

        farmerName,
        email,
        date,
        address,
        phoneNumber,
        harvestedDate,
        cropType,
        yieldAmount,
        amountType,
        unitPrice

    }

    const update = await YieldsDetails.findByIdAndUpdate(yieldsId, updateYieldsdetails)
    .then(() => {
        res.status(200).send({status: "Yields Details Updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating yields details", error: err.message});
    })

})

// Delete Crop Details
router.route("/delete-yieldsdetails/:yieldsid").delete(async(req, res) => {

    let yieldsId =req.params.yieldsid;

    await YieldsDetails.findByIdAndDelete(yieldsId)
    .then(() => {
        res.status(200).send({status: "Yields Details Deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete yields details", error: err.message});
    })
})

// Fetch only one crop details
router.route("/get-yieldsdetails/:yieldsid").get(async (req,res) => {

    let yieldsId =req.params.yieldsid;
    await YieldsDetails.findById( yieldsId)
    .then((yieldsdetail) => {
        res.status(200).send({status: "Yields Details Fetched", yieldsdetail})
        
    }).catch(() => {
        console.log(err.message);
        res.status(500).send({status: "Error with get yields details", error: err.message});
    })
})

// Route to get yields by email
router.route("/yieldsdetails/:email").get(async (req, res) => {
    const email = req.params.email;

    try {
        const yieldsDetails = await YieldsDetails.find({ email });
        if (yieldsDetails.length > 0) {
            res.status(200).json(yieldsDetails);
        } else {
            res.status(404).json({ message: "No yields details found for this email" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
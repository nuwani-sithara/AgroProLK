const router = require("express").Router();
let RequestDetails = require("../models/RequestDetails");

// Add Request Details
router.route("/add-requestdetails").post((req,res) => {
    
    const farmerName = req.body.farmerName;
    const cropType = req.body.cropType;
    const unitPrice = Number(req.body.unitPrice);
    const item_id = req.body.item_id;
    const buyerName = req.body.buyerName;
    const email = req.body.email;
    const date = req.body.date;
    const address = req.body.address;
    const phoneNumber = req.body.phoneNumber;
    const requestedYieldsAmount = Number(req.body.requestedYieldsAmount);
    const requestedPrice = Number(req.body.requestedPrice);
    //const status = req.body.status;

    const newRequestdetails = new RequestDetails ({
        farmerName,
        cropType,
        unitPrice,
        buyerName,
        email,
        date,
        address,
        phoneNumber,
        requestedYieldsAmount,
        requestedPrice,
        item_id
        //status

    })

    newRequestdetails.save().then(() => {
        res.json("Request Deatils Added")
    }).catch((err) => {
        console.log(err);
    })

})

// Read Request Details
router.route("/view-requestdetails").get((req,res) => {

    RequestDetails.find().then((requestdetails) => {
        res.json(requestdetails)
    }).catch((err) => {
        console.log(err)
    })
})

// Edit Request Details
router.route("/update-requestdetails/:requestid").put(async (req,res) => {

    let requestId = req.params.requestid;
    const{buyerName, email, date, address, phoneNumber, requestedYieldsAmount, requestedPrice, status} = req.body;

    const updateRequestdetails = {

        
        buyerName,
        email,
        date,
        address,
        phoneNumber,
        requestedYieldsAmount,
        requestedPrice,
        status
        

    }

    await RequestDetails.findByIdAndUpdate(requestId, updateRequestdetails)
    .then(() => {
        res.status(200).send({status: "Request Details Updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating request details", error:err.message});
    })

})

// Delete Request Details
router.route("/delete-requestdetails/:requestid").delete(async(req,res) => {

    let requestId = req.params.requestid;

    await RequestDetails.findByIdAndDelete(requestId).then(() => {
        res.status(200).send({status: "Request Details Deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete requesrt details", error: err.message});
    })
})

// Fetch only one request detail
// Fetch only one request detail
router.route("/get-requestdetails/:requestid").get(async (req,res) => {

    let requestId = req.params.requestid;
    await RequestDetails.findById(requestId)
    .then((requestdetail) => {
        res.status(200).send({status: "Request Details Fetched", requestdetail})
    }).catch((err) => {  // <-- Add `err` here
        console.log(err.message);  // Now err is defined
        res.status(500).send({status: "Error with get request details", error: err.message});
    })

});


// Find request details using email
router.route("/get-requestdetails-by-email/:email").get(async(req, res) => {
    const email = req.params.email;
    try {
        const requestdetail = await RequestDetails.find({ email });
        if (!requestdetail) {
            return res.status(404).json({ status: "Request not found" });
        }
        res.status(200).json({ requestdetail });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with getting Request", error: err.message });
    }
});

// Find request details using id
router.route("/get-requestdetails-by-id/:id").get(async(req, res) => {
    const item_id = req.params.id; 
    try {
        const requestdetail = await RequestDetails.find({ item_id });
        if (!requestdetail || requestdetail.length === 0) {
            return res.status(404).json({ status: "Request not found" });
        }
        res.status(200).json({ requestdetail });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with getting Request", error: err.message });
    }
});




module.exports = router;
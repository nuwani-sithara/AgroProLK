const router = require("express").Router();
let RequestDetails = require("../models/RequestDetails");

// Add Request Details
router.route("/add-requestdetails").post((req,res) => {

    const buyerName = req.body.buyerName;
    const address = req.body.address;
    const date = req.body.date;
    const phoneNumber = req.body.phoneNumber;
    const requestedCropSize = Number(req.body.requestedCropSize);
    const requestedPrice = Number(req.body.requestedPrice);

    const newRequestdetails = new RequestDetails ({

        buyerName,
        address,
        date,
        phoneNumber,
        requestedCropSize,
        requestedPrice

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
    const{buyerName, address, date, phoneNumber, requestedCropSize, requestedPrice} = req.body;

    const updateRequestdetails = {

        buyerName,
        address,
        date,
        phoneNumber,
        requestedCropSize,
        requestedPrice

    }

    const update = await RequestDetails.findByIdAndUpdate(requestId, updateRequestdetails)
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
router.route("/get-requestdetails/:requestid").get(async (req,res) => {

    let requestId = req.params.requestid;
    await RequestDetails.findById(requestId)
    .then((requestdetail) => {
        res.status(200).send({status: "Request Details Fetched", requestdetail})
    }).catch(() => {
        console.log(err.message);
        res.status(500).send({status: "Error with get request details", error: err.message});
    })

})

module.exports = router;
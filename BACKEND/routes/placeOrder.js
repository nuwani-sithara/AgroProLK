const router = require("express").Router();
let Fertilizer = require("../models/placeOrder");

//place a new order
router.route("/placeOrder").post((req,res) => {

    const userID = req.body.userID;
    const fertilizerID = req.body.fertilizerID;
    const quantity = Number(req.body.quantity);
    const totalPrice = Number(req.body.totalPrice);
   
    const placeOrder = new PlaceOrder({
        userID ,
        fertilizerID ,
        quantity ,
        totalPrice 
    })

    placeOrder.save().then(() => {
        res.json("Place a new order...")
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

module.exports = router;
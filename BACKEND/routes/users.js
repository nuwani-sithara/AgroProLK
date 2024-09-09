const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let users = require("../models/users");

// router.route("/adduser").post((req,res) => {
//     const name = req.body.name;
//     const address = req.body.address;
//     const phoneNumber = req.body.phoneNumber;
//     const email = req.body.email;
//     const password = req.body.password;

//     const newUsers = new users({
//         name,
//         address,
//         phoneNumber,
//         email,
//         password
//     })

//     newUsers.save().then(()=>{
//         res.json("New User Added")
//     }).catch((err)=>{
//         console.log(err);
//     })
// })



router.route("/adduser").post(async (req, res) => {
    const { name, address, phoneNumber, email, password,user_Type } = req.body;

    try {

        const newUser = new users({
            name,
            address,
            phoneNumber,
            email,
            password
            
        });

        await newUser.save();
        res.json("New User Added");
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with adding user", error: err.message });
    }
});

router.route("/verify-password").post(async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await users.findOne({ email });
        if (!user) return res.json({ success: false, message: "User not found" });

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: "Incorrect password" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with password verification", error: err.message });
    }
});




router.route("/getallusers").get((req,res) => {

    users.find().then((users) => {
        res.json(users)
    }).catch((err) =>{
        console.log(err)
    })
})

router.route("/updateUser/:id").put(async(req,res) => {

    let userID = req.params.id;
    const {name,address,phoneNumber,email,password,user_Type} = req.body;

    const updateUser = {
        name,
        address,
        phoneNumber,
        email,
        password,
        user_Type
    }

    await users.findByIdAndUpdate(userID,updateUser).then(() => {
        res.status(200).send({status: "User Updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating",error:err.message});
    })
})


router.route("/deleteUser/:id").delete(async(req,res) => {

    let userID = req.params.id;

    await users.findByIdAndDelete(userID).then(() => {
        res.status(200).send({status: "User Deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Erro with delete user",error: err.message});
        })
})

//get one user only

router.route("/getusers/:id").get(async(req,res) => {

    let userID = req.params.id;
    await users.findById(userID).then((users) => {
        res.status(200).send({status: "User fetched", users})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.message})
    })
})


// Find user by email
router.route("/findByEmail/:email").get(async (req, res) => {
    const email = req.params.email;

    try {
        const user = await users.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: "User not found" });
        }
        res.status(200).json({ user });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with getting user", error: err.message });
    }
});

module.exports = router;
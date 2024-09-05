const router = require("express").Router();

let users = require("../models/users");

router.route("/adduser").post((req,res) => {
    const name = req.body.name;
    const address = req.body.address;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const password = req.body.password;

    const newUsers = new users({
        name,
        address,
        phoneNumber,
        email,
        password
    })

    newUsers.save().then(()=>{
        res.json("New User Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/getallusers").get((req,res) => {

    users.find().then((users) => {
        res.json(users)
    }).catch((err) =>{
        console.log(err)
    })
})

router.route("/update/:id").put(async(req,res) => {

    let userID = req.params.id;
    const {name,address,phoneNumber,email,password,userType} = req.body;

    const updateUser = {
        name,
        address,
        phoneNumber,
        email,
        password,
        userType
    }

    const update = await
    users.findByIdAndUpdate(userID,updateUser).then(() => {
        res.status(200).send({status: "User Updated"})
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating",error:err.message});
    })
})


router.route("/delete/:id").delete(async(req,res) => {

    let userID = req.params.id;

    await users.findByIdAndDelete(userID).then(() => {
        res.status(200).send({status: "User Deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Erro with delete user",error: err.message});
        })
})

//get one user only

router.route("/get/:id").get(async(req,res) => {

    let userID = req.params.id;
    await users.findById(userID).then((users) => {
        res.status(200).send({status: "User fetched", users})
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with get user", error: err.message})
    })
})

module.exports = router;
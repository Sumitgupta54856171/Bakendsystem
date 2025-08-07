const express = require("express");
const Admin = express.Router();
const claim = require('../model/claim')
 const {io} = require('../backend')
 const verifytoken = require("../middleware/verification")
Admin.use(verifytoken)
Admin.get("/", async(req, res) => {
    res.send("Hello World!");
    const claims = await claim.find({
        adminpass:true
    })
    .then((claims)=>{
        res.status(200).json({message:"Authorized",claims})
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({message:"Internal server error"})
    })
    
});

io.to('adminRoom').on('joinAdmin',async(adminclaim,status)=>{
    console.log('Admin joined adminRoom');
    const claims = await claim.findOneAndUpdate(adminclaim,{status:status,adminpass:true})
    .then((claims)=>{
        io.to('adminRoom').emit('updateClaim',claims);
    })
    .catch((err)=>{
        console.log(err)
        io.to('adminRoom').emit('updateClaim',err);
    })
});
io.to('adminRoom').on('disconnect',()=>{
    console.log('Admin disconnected adminRoom');
});

module.exports = Admin;
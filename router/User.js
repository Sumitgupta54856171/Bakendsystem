const express = require("express");
const User = express.Router();
const verifytoken = require("../middleware/verification")
const cookieParser = require('cookie-parser');
const { createPost } = require("../controller/post");
const upload = require("../controller/uploads");
const jwt = require("jsonwebtoken");
const path = require("path");
const { postclaimsubmit } = require("../controller/post");
const post = require("../model/post")
User.use(cookieParser());
User.use(express.json());
User.use(express.urlencoded({ extended: true }));
User.use(express.static(path.join(__dirname,'../views')));
User.use((req,res,next)=>{
    console.log("hello")
    next()
})
User.use(verifytoken)
User.get("/",(req,res)=>{
    console.log("user")
})
User.post("/post",upload.single("image"),createPost)
User.post("/postclaimsubmit",upload.single("image"),postclaimsubmit)
User.get("/post",async(req,res)=>{
    const posts = await post.find()
    res.json(posts)
})
User.get("/post/:id",async(req,res)=>{
    const post = await post.findById(req.params.id)
    .then(()=>{
        res.status(200).json({message:"Authorized",post})
})
    .catch((err)=>{
        console.log(err)
        res.status(500).json({message:"Internal server error"})
    })
})

module.exports = User;
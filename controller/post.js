const post = require("../model/post")
const jwt = require("jsonwebtoken");
const claim = require("../model/claim")
const createPost = async (req,res)=>{
    const {title} = req.body;
    console.log(req.body)
    const token = req.cookies.token;
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
   console.log(decoded)
   if(req.file){
    const image ={
        name: req.file.filename,
        path: req.file.path
    }
    const posts = new post({
        title,
        userid:decoded.userId,
        image
    })
    posts.save()
    .then(()=>{
        res.status(201).json({message:"Post created successfully"})
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({message:"Internal server error"})
    })
   }else{
    const posts = new post({
        title,
        userid:decoded.userId,
    })
    posts.save()
    .then(()=>{
        res.status(201).json({message:"Post created successfully"})
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({message:"Internal server error"})
    })
}}


const postclaimsubmit =async(req,res)=>{
    const {postid,like,views}=req.body;
    if(!req.file){
        return res.status(400).json({message:"No file uploaded"})
    }
    const image={
        name: req.file.filename,
        path: req.file.path
    }
    const posts = await post.findById(postid)
    
    if(!post){
        return res.status(404).json({message:"Post not found"})
    }
    const claim = new claim({
        postid:postid,
        screenshort:image,
        like,
        views
    })
    claim.save()
    .then(async()=>{
        
        
        res.status(201).json({message:"Post claimed send successfully"})
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({message:"Internal server error"})
    })
    
   
}

module.exports={createPost,postclaimsubmit}
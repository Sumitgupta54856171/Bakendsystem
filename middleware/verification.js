const jwt = require("jsonwebtoken");
const user = require("../model/user")

const verifytoken = async (req,res,next)=>{
    const token = req.cookies;
    console.log(token)
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    console.log("step 1")
    const decoded = jwt.verify(token.token,process.env.JWT_SECRET);
    const users = await user.findById(decoded.userId);
    console.log(users)
    console.log(req.url)
    console.log("step 2")
    if(!users){
        return res.status(401).json({message:"Unauthorized"});
    }
    req.user = users;
    console.log("step 3")
    next();
}
module.exports = verifytoken;

const claim = require("../model/claim")
const getLast24Hours = async (req,res) => {
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  
    const usersclaims = await claim.find({
      createdAt: { $gte: twentyFourHoursAgo, $lte: now }
    }).exec()
    .then((usersclaims)=>{
        res.status(200).json({message:"Authorized",usersclaims});
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({message:"Internal server error"})
    })
  
    
  };
  const getThisWeek = async (req,res) => {
    const now = new Date();
    const startOfWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
    const usersclaims = await claim.find({
      createdAt: { $gte: startOfWeek, $lte: now }
    }).exec()
    .then((usersclaims)=>{
        res.status(200).json({message:"Authorized",usersclaims});
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({message:"Internal server error"})
    })
  
    
  };
  
  const getThisMonth = async (req,res) => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  
    const usersclaims = await claim.find({
      createdAt: { $gte: startOfMonth, $lte: now }
    }).exec()
    .then((usersclaims)=>{
        res.status(200).json({message:"Authorized",usersclaims});
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({message:"Internal server error"})
    })
  
  
  };
  
  
  
module.exports={getLast24Hours,getThisWeek,getThisMonth}


function calculatePostEarnings(views, likes) {
    try {
        if (views < 0 || likes < 0) {
            throw new Error('Views and likes cannot be negative');
        }
        
        if (views === 0) {
            return 0; // No views = no earnings
        }
        
        const viewSegments = Math.floor(views / 1000);
        
        if (viewSegments === 0) {
            return 0; 
        }
        
        const likesPerThousand = (likes / views) * 1000;
        
        let ratePerSegment = 0;
        
        if (likesPerThousand >= 100) {
            ratePerSegment = 10; // ₹10 per 1000 views if 100+ likes per 1000 views
        } else if (likesPerThousand >= 50) {
            ratePerSegment = 7;  // ₹7 per 1000 views if 50-99 likes per 1000 views
        } else if (likesPerThousand >= 25) {
            ratePerSegment = 4;  
        } else {
            ratePerSegment = 0; 
        }
        
        const totalEarnings = viewSegments * ratePerSegment;
        
        return {
            totalEarnings: totalEarnings,
            viewSegments: viewSegments,
            likesPerThousand: Math.round(likesPerThousand * 100) / 100, 
            ratePerSegment: ratePerSegment,
            breakdown: {
                views: views,
                likes: likes,
                eligibleViews: viewSegments * 1000,
                remainingViews: views % 1000
            }
        };
        
    } catch (error) {
        console.error('Error calculating earnings:', error.message);
        return {
            totalEarnings: 0,
            error: error.message
        };
    }
}

function calculatePostEarningsDetailed(views, likes) {
    const result = calculatePostEarnings(views, likes);
    
    if (result.error) {
        return result;
    }
    
    let explanation = [];
    
    if (result.viewSegments === 0) {
        explanation.push(`Views (${views}) are less than 1000, so no earnings qualify.`);
    } else {
        explanation.push(`Total Views: ${views}`);
        explanation.push(`Eligible Views: ${result.breakdown.eligibleViews} (${result.viewSegments} segments of 1000)`);
        explanation.push(`Remaining Views: ${result.breakdown.remainingViews}`);
        explanation.push(`Total Likes: ${likes}`);
        explanation.push(`Likes per 1000 views: ${result.likesPerThousand}`);
        
        if (result.likesPerThousand >= 100) {
            explanation.push(`Rate: ₹${result.ratePerSegment} per 1000 views (100+ likes per 1000 views)`);
        } else if (result.likesPerThousand >= 50) {
            explanation.push(`Rate: ₹${result.ratePerSegment} per 1000 views (50-99 likes per 1000 views)`);
        } else if (result.likesPerThousand >= 25) {
            explanation.push(`Rate: ₹${result.ratePerSegment} per 1000 views (25-49 likes per 1000 views)`);
        } else {
            explanation.push(`Rate: ₹${result.ratePerSegment} per 1000 views (Less than 25 likes per 1000 views)`);
        }
        
        explanation.push(`Calculation: ${result.viewSegments} segments × ₹${result.ratePerSegment} = ₹${result.totalEarnings}`);
    }
    
    return {
        ...result,
        explanation: explanation
    };
    
}

const checkAccount=async(req,res)=>{
    const token = req.cookies.token;
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    const users = await user.findById(decoded.userId);
   if(users.role!=="account"){
        return res.status(401).json({message:"Unauthorized"});
   }
  
  const postclaimcheck = await claim.find()
    console.log(postclaimcheck)
    if(!postclaimcheck){
        return res.status(401).json({message:"Unauthorized"});
    }
  res.status(200).json({message:"Authorized",postclaimcheck});
}
module.exports={calculatePostEarningsDetailed,checkAccount}
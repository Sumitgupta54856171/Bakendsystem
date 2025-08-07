const mongoose =require('mongoose');
module.exports = function db(){
    mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("mongodb is a connected")
    })
    .catch((err)=>{
    console.log(err)
    });
} 
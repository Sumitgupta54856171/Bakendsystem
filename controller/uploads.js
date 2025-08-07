const multer = require('multer');
const path =require('path')
const storge =multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,'uploads/');
    },
    filename:(req,file,cb)=>{
      cb(null,Date.now() + path.extname(file.originalname));
    }});
    const upload =multer({storage:storge});
    module.exports=upload;
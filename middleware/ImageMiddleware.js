const multer=require("multer")
const path=require("path")

// to send the image to upload folder
const Storage=multer.diskStorage({
    destination:"./public/upload",
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
}) 
var upload=multer({
    storage:Storage

}).single('image')

module.exports=upload;
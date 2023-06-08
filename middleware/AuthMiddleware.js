const jwt=require("jsonwebtoken")
const UserModel=require("../models/user.js")

const auth=async(req,res,next)=>{
    try{
        const token=req.cookies.jwt
        //console.log(token)
        const verifyUser=jwt.verify(token,'salonimehta')
        //console.log(verifyUser)
        const user=await UserModel.findOne({_id:verifyUser._id})
        req.user=user
        next()
    }
    catch(err){
        //console.log(err)
        res.redirect('/')
    }
}



module.exports=auth;
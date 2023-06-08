const jwt=require("jsonwebtoken")
const UserModel=require("../models/user.js")

const AuthRole=(roles)=>{
    return (req,res,next)=>{
        //console.log(req.user.role)
        if(!roles.includes(req.user.role)){
            return next(
                res.redirect("/home")
            )
        }
        next()
    }
}
module.exports=AuthRole
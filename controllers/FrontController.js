const CourseModel = require("../models/course.js")
const UserModel = require("../models/user.js")
class FrontController{

    static login=async(req,res)=>{
        res.render('front/login',{message:req.flash('error')})
    }
    static home=async(req,res)=>{
        const {name,_id}=req.user
        const result= await UserModel.findOne({user_id:_id})
        const data1 = await CourseModel.findOne({user_id:_id,course:"Btech"})
        const data2 = await CourseModel.findOne({user_id:_id,course:"BCA"})
        const data3 = await CourseModel.findOne({user_id:_id,course:"BBA"})
        
        res.render('front/home',{n:name,d1:data1,d2:data2,d3:data3,data:result})
    }
    

}
module.exports = FrontController
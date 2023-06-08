const CourseModel=require("../models/course.js")

class AdminController{

    static dashboard=async(req,res)=>{
        try{
            const {name,_id}=req.user
            const result = await CourseModel.find()
            res.render('admin/dashboard',{data:result,n:name,user_id:_id})
        }
        catch(err){
            console.log(err)
        }
        
    }
    static enrolled_students = async(req,res)=>{
        try{
            const {name,_id}=req.user
            
            const result = await CourseModel.find()
            res.render('admin/enrolled_students',{data:result,n:name,user_id:_id})
            
        }
        catch(err){
            console.log(err)
        }
    }
    static pending_applications = async(req,res)=>{
        try{
            const {name,_id}=req.user
            const result = await CourseModel.find()
            res.render('admin/pending_applications',{data:result,n:name,user_id:_id})
        }
        catch(err){
            console.log(err)
        }
    }
    static rejected_applications = async(req,res)=>{
        
        try{
            const {name,_id}=req.user
            const result = await CourseModel.find()
            res.render('admin/rejected_applications',{data:result,n:name,user_id:_id})
        }
        catch(err){
            console.log(err)
        }
    }
    static application_display = async(req,res)=>{
        // res.render('admin/blog/blog')
        try{
            const{name,_id}=req.user
            const result = await CourseModel.findById(req.params.id)
            res.render('admin/application_display',{data: result,n:name})
        }
        catch(err){
            console.log(err)
        }
    }
    static update_status=async(req,res)=>{
        try{
            const result = await CourseModel.findByIdAndUpdate(req.params.id , {
                
                status:req.body.status,
                comment:req.body.comment
            })
            await result.save()
            // end here

            //console.log(result)
            res.redirect('/admin/pending_applications')
        }
        catch(err){
            console.log(err)
        }
    }
}
module.exports = AdminController
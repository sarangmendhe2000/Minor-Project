const CourseModel=require("../models/course.js")
const UserModel=require("../models/user.js")

class CourseController{

    static btech_register=async(req,res)=>{
        const {name,email,_id}=req.user
        const result= await UserModel.findOne({user_id:_id})
        res.render('course/btech_register', {n:name,e:email,id:_id,data:result})
    }
    static bba_register=async(req,res)=>{
        const {name,email,_id}=req.user
        const result= await UserModel.findOne({user_id:_id})
        res.render('course/bba_register', {n:name,e:email,id:_id,data:result})
    }
    static bca_register=async(req,res)=>{
        const {name,email,_id}=req.user
        const result= await UserModel.findOne({user_id:_id})
        res.render('course/bca_register', {n:name,e:email,id:_id,data:result})
    }
    static registration=async(req,res)=>{
        //console.log(req.body)
        //const {name,email,phone,state,city,specialization,image}=req.body
        //if(name && email && phone && state && city && specialization && image){
        try{
            const result=new CourseModel({
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone,
                dob:req.body.dob,
                gender:req.body.gender,
                address:req.body.address,
                course:req.body.course,
                specialization:req.body.specialization,
                year_10th:req.body.year_10th,
                school_10th:req.body.school_10th,
                board_10th:req.body.board_10th,
                percentage_10th:req.body.percentage_10th,
                year_12th:req.body.year_12th,
                school_12th:req.body.school_12th,
                board_12th:req.body.board_12th,
                percentage_12th:req.body.percentage_12th,
                graduation_year:req.body.graduation_year,
                graduation_school:req.body.graduation_school,
                graduation_board:req.body.graduation_board,
                graduation_percentage:req.body.graduation_percentage,
                image:req.file.filename,
                user_id:req.body.user_id
             })
            await result.save()
            return res.redirect("/home")
         }
        catch(err)
            {
                console.log(err)
            }
    }
    static display = async(req,res)=>{
        // res.render('admin/blog/blog')
        try{
            const {name,_id}=req.user
            
                const result = await CourseModel.find({user_id:_id})
                res.render('course/display',{data: result,n:name})
           

        }
        catch(err){
            console.log(err)
        }
    }
    static view_detail = async(req,res)=>{
        // res.render('admin/blog/blog')
        try{
            const {name,_id}=req.user
            
                const result = await CourseModel.find({user_id:_id})
                res.render('course/view_detail',{data: result,n:name})

        }
        catch(err){
            console.log(err)
        }
    }
    static edit_detail=async(req,res)=>{
        //console.log(req.params.id)
        try{
            const {name,_id}=req.user
            const result=await CourseModel.findById(req.params.id)
            //console.log(result)
            res.render('course/edit_detail',{data:result,n:name})
        }catch(err){
            console.log(err)
        }
    }
    static update_detail=async(req,res)=>{
        // console.log(req.params.id)
        // console.log(req.body)
        try{
            if(req.file){
                var imagefile=req.file.filename;
            }
            // const result=await BlogModel.findByIdAndUpdate(req.params.id, req.body)

            // if in form we write name other than fields of database than use below code
            const result = await CourseModel.findByIdAndUpdate(req.params.id , {
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone,
                dob:req.body.dob,
                gender:req.body.gender,
                address:req.body.address,
                course:req.body.course,
                specialization:req.body.specialization,
                year_10th:req.body.year_10th,
                school_10th:req.body.school_10th,
                board_10th:req.body.board_10th,
                percentage_10th:req.body.percentage_10th,
                year_12th:req.body.year_12th,
                school_12th:req.body.school_12th,
                board_12th:req.body.board_12th,
                percentage_12th:req.body.percentage_12th,
                graduation_year:req.body.graduation_year,
                graduation_school:req.body.graduation_school,
                graduation_board:req.body.graduation_board,
                graduation_percentage:req.body.graduation_percentage,
                
            })
            await result.save()
            // end here

            //console.log(result)
            res.redirect('/display')
        }catch(err){
            console.log(err)
        }
    }
}

    


module.exports = CourseController
const mongoose =require('mongoose');

//define Schema
const CourseSchema =new mongoose.Schema({

    name:{type:String, required:true, trim:true},
    email:{type:String, required:true, trim:true,unique:true},
    phone:{type:String, required:true, trim:true},
    dob:{type:String, required:true, trim:true},
    gender:{type:String, required:true, trim:true},
    address:{type:String, required:true, trim:true},
    course:{type:String, required:true, trim:true},
    specialization:{type:String, required:true, trim:true},
    year_10th:{type:String, required:true, trim:true},
    school_10th:{type:String, required:true, trim:true},
    board_10th:{type:String, required:true, trim:true},
    percentage_10th:{type:String, required:true, trim:true},
    year_12th:{type:String, required:true, trim:true},
    school_12th:{type:String, required:true, trim:true},
    board_12th:{type:String, required:true, trim:true},
    percentage_12th:{type:String, required:true, trim:true},
    graduation_year:{type:String,  trim:true},
    graduation_school:{type:String, trim:true},
    graduation_board:{type:String,  trim:true},
    graduation_percentage:{type:String,  trim:true},
    image:{type:String, required:true, trim:true},
    user_id:{type:String, required:true, trim:true},
    status:{type:String, default:"Pending"},
    comment:{type:String}
},{timestamps:true})


const CourseModel = mongoose.model('course',CourseSchema);


module.exports = CourseModel ;  
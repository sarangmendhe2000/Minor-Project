const UserModel=require("../models/user.js")
const bcrypt = require('bcrypt');
class UserController{

    static signup=async(req,res)=>{

        res.render("front/signup",{message:req.flash('error')})
    
    }
    
    static insertuser=async(req,res)=>{
        // console.log(req.body)
        const {name,email,password,cnpassword}=req.body
        const user = await UserModel.findOne({email:email})
        if(user){
            //using connect-flash package
            //error is a message
            req.flash('error','email already exists')
            return res.redirect('/signup')
        }
        else{
            if(name && email && password && cnpassword){
                if(password===cnpassword){
                    try{
                        const salt = await bcrypt.genSalt(10)
                        const hashPassword = await bcrypt.hash(password, salt)
                        const result=await UserModel({
                            name:name,
                            email:email,
                            password:hashPassword
                        })
                        //JWT generate token
                        const token=await result.generateAuthToken()
                        // console.log(token)
                        res.cookie('jwt',token)
                        await result.save()
                        req.flash('error','Account Created Successfully')
                        return res.redirect("/")
                        
                    }
                    catch(err)
                    {
                        console.log(err)
                    }
                }
                else{
                    req.flash('error','Password and confirm password does not match')
                    return res.redirect('/signup')
                }
            }
            else{
                req.flash('error','All fields are required')
                return res.redirect('/signup')
            }
        }
     }

    static verify_login = async(req,res)=>{
        try{
            const{email,password}= req.body
            if(email && password){
                const user = await UserModel.findOne({email:email})
                if(user != null){
                    const isMatch = await bcrypt.compare(password,user.password)
                    if((user.email === email) && isMatch){
                        if(user.role==1){
                        //generate token
                        const token=await user.generateAuthToken()
                        //console.log(token)
                        res.cookie('jwt',token)
                        res.redirect('/home')
                        }
                        if(user.role=="admin"){
                            const token=await user.generateAuthToken()
                            res.cookie('jwt',token)
                            res.redirect('/admin/dashboard')
                        }
                    }
                    else{
                        req.flash('error','Email or Password is not valid')
                        return res.redirect('/')
                    }
                }
                else{
                    req.flash('error','You are not registered user')
                    return res.redirect('/')
                }
            }
            else{
                req.flash('error','All fields are required')
                return res.redirect('/')
            }
            //console.log(email)
        }
        catch(err){
            console.log("error")
        }
     }
    static logout= async(req,res)=>{
        try{
            res.clearCookie('jwt')
            res.redirect('/')
        }
        catch(err){
            console.log(err)
        }
    }
    static change_password=async(req,res)=>{
        try{
            const {name,role}=req.user
            const result = await UserModel.findById(req.params.id);
            res.render("front/change_password",{n:name,r:role,data:result,message:req.flash('error')})
        }
        catch(err){
            console.log(err)
        }
        
    }
    static update_password= async(req,res)=>{
        try{
            const { opassword, npassword, cnpassword}=req.body
            if(opassword && npassword && cnpassword)
            {
                const user= await UserModel.findById(req.user.id)
                const isMatch= await bcrypt.compare(opassword,user.password)
                if(!isMatch)
                {
                    req.flash('error','Old Password is incorrect.')
                    return res.redirect("/front/change_password")
                }
                else{
                //new password confirm password check
                    if(npassword !== cnpassword)
                    {
                        req.flash('error','Password does not match.')
                        return res.redirect("/front/change_password")
                        
                    }
                    else{
                        const salt= await bcrypt.genSalt(10)
                        const newHashPassword = await bcrypt.hash(npassword,10)
                        await UserModel.findByIdAndUpdate(req.user.id,{$set:{password:newHashPassword}})
                        req.flash('error','Password changed successfully')
                        return res.redirect("/front/change_password")
                        
                    }
                }
            }
            else{
                req.flash('error','All fields are required')
                return res.redirect("/front/change_password")
            }
        }
        catch(err)
        {
            console.log(err)
        }
        
    }
}
module.exports=UserController
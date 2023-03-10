const bcrypt=require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
exports.Signup=async (req,res)=>{
    try {
        const {
            fullname,
            username,
            email,
            password,
        } =req.body
        const userExist= await User.findOne({email})
        if(userExist){
            return res.status(406).json({status:"Fail",message:"The user account is already created ! "})
        }
        // encrypt password 
        const salt=await bcrypt.genSalt(10)
        const hashPassword=await bcrypt.hash(password,salt)
        
   

        // save to the data base
        const newUser=new User({
            fullname,
            username,
            email,
            password:hashPassword,
        })
        const user = await newUser.save()
        let payload={
            username:user.username,
            id:user._id 
         }
         const token=jwt.sign(payload,'json-web-token.')
        // send success response
        res.status(201).json({status:"success",message:"your new user account created",token,user})
    } catch (error) {
        res.status(500).json({status:"Error"})
    }
}

exports.protect=async(req,res,next)=>{
    let token=req.headers.authorization.split(' ')[1] || ''
    if(!token) return res.status(404).json({status:"fail",message:"login again and continue"})
    const decoded= jwt.verify(token , 'json-web-token')

    const currentuser=await User.findById(decoded.id)

    if(!currentuser) return res.status(404).json({status:"fail",message:"user not found"})
    req.user=currentuser
    next()
}

exports.Login=async (req,res) =>{
   try {
     const {email,password}=req.body
     const user=await User.findOne({email})

     if(!user) return res.status(404).json({message:"user deos't exist"})
     const passwordCorrect=await bcrypt.compare(password,user.password)


     if(!passwordCorrect) return res.status(404).json({message:"possword is not correct"})

     let payload={
        username:user.username,
        id:user._id 
     }
     const token=jwt.sign(payload,'json-web-token')

     res.status(200).json({status:"success",user,token})
   } catch (error) {
    res.status(500).json({status:"Error"})
   }
}
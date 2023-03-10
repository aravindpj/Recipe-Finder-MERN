const User = require("../models/User")

exports.getMe=async (req,res)=>{
    try {
        let id=req.user._id || req.params.id
        const user = await User.findById(id)
        if(!user) return res.status(404).json({status:"fail",message:"user not found "})
        res.status(200).json({status:"sucess",user})
    } catch (error) {
        res.status(500).json({status:"Error"})
    }
}
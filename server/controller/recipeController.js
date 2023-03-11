const Recipe = require('../models/Recipe')
exports.addRecipe=async (req,res)=>{
   req.body.user=req.user._id
   console.log('Working');
   await Recipe.create(req.body)
   res.status(200).json({status:"success"})
}

exports.getAllrecipe=async (req,res) =>{
    console.log(
        req.query
    );
    let query=Recipe.find()
    if(req.query.sort){
      let sortby=req.query.sort.split(',').join(' ')
      console.log(sortby);
      query=query.sort(sortby)
    }
    if(req.query.search){    
        query=query.find({title : req.query.search})
    }

    let data=await query
   
    res.status(200).json({status:"success",data})
}
exports.getRecipe=async (req,res) =>{
    const id = req.params.id
    const data=await Recipe.findById(id).populate('user').populate('reviews')
    res.status(200).json({status:"success",data})
}
exports.getMyrecipe=async (req,res) =>{
    const data=await Recipe.find({user:req.user._id})
    res.status(200).json({status:"success",data})
}
exports.delRecipe=async(req,res)=>{
     const data= await Recipe.findByIdAndDelete({_id:req.params.id},{new:true})
     res.status(200).json({status:"success",data})
}
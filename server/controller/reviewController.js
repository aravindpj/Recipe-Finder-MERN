const Review = require('../models/Review')
exports.createReview=async function(req,res){
     if(!req.user || req.params.recipe) return res.status(404) 
     req.body.user=req.user._id
     req.body.recipe=req.params.id
     await Review.create(req.body)
     res.status(200).json({status:"success"})
}
const { createReview } = require('../controller/reviewController')

const router=require('express').Router({mergeParams:true})

router.post('/',createReview)

module.exports=router
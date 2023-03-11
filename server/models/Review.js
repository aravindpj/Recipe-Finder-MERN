const {Schema,model, default: mongoose} = require('mongoose')

const reviewSchema=new Schema({
   review:String,
   user:{
    type:mongoose.Schema.ObjectId,    
    ref: 'User',
   },
   recipe:{
    type:mongoose.Schema.ObjectId,    
    ref: 'Review',
   },
   createdAt:{
    type:Date,
    default:Date.now()
   }
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})

reviewSchema.index({recipe:1,user:1},{unique:true})

reviewSchema.pre(/^find/,function(next){
    this.populate({
        path:"user",
        select:"fullname"
    })
    next()
})
const Review=model('Review',reviewSchema)
module.exports=Review
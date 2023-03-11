const {Schema,model, default: mongoose} = require('mongoose')

const recipeSchema=new Schema({
    title:String,
    url:String,
    preperationtime:Number,
    user:{
        type:mongoose.Schema.ObjectId,    
        ref: 'User',
    },
    description:String,
    serving:Number,
    ingredients:[{ingredient:String}],
    imageurl:String
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
})

recipeSchema.virtual('reviews',{
    ref:'Review',
    foreignField:'recipe',
    localField:'_id'
  })

const Recipe=model('Recipe',recipeSchema)
module.exports=Recipe
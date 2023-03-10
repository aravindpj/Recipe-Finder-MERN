const {Schema,model} = require('mongoose')

const userSchema=new Schema({
    fullname:{
        type:String,
        require:[true,'full name required']
    },
    username:{
        type:String,
        require:[true,'username is required'],
        unique:true
    },
    email:{
        type:String,
        unique:true
    },
    profile:{
        type:String,
        default:"default.jpg"
    },
    password:{
        type:String,
        min:[8,'password must be 8 charcters needed']
    }
})

const User=model('User',userSchema)
module.exports=User
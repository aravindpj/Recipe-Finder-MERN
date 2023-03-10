const mongoose=require('mongoose')

exports.Connect=()=>new Promise((resolve,reject)=>{
    mongoose.connect(process.env.DB)
    .then(()=>resolve(`Database connected`))
    .catch((error)=>reject(error))
})

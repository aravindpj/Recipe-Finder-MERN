const bodyParser = require('body-parser')
const express=require('express')
require('dotenv').config()
const cors=require('cors')
const path = require("path");
const { Connect } = require('./db/database')
const userRouter=require('./router/userRouter')
const recipeRouter=require('./router/recipeRouter')
const app=express()


app.use(cors())

app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, "public")));

app.use('/api/v1/user',userRouter)
app.use('/api/v1/recipe',recipeRouter)

let port=process.env.PORT || 4000
Connect().then(data=>console.log(data)).catch((err)=>console.log(err.message))
app.listen(port,()=>console.log(`Server running: http//localhost:5000`))
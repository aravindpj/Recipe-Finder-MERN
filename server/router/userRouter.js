const router=require('express').Router()

const { protect, Signup, Login } = require('../controller/authController')
const { getMyrecipe } = require('../controller/recipeController')
const { getMe } = require('../controller/userController')
router.post('/signup',Signup)
router.post('/login',Login)
router.use(protect)
router.get('/getMyrecipe',getMyrecipe)
router.get('/getaccount',getMe)

module.exports=router
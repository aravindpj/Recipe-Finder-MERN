const router=require('express').Router()
const reviewRouter=require('../router/reviewRouter')
const { protect, Signup, Login } = require('../controller/authController')
const { addRecipe, getAllrecipe, getRecipe, delRecipe} = require('../controller/recipeController')
router.get('/',getAllrecipe)
router.get('/:id',getRecipe)

router.use(protect)
router.delete('/:id',delRecipe)
router.use('/review/:id/',reviewRouter)
router.post('/create',addRecipe)

module.exports=router
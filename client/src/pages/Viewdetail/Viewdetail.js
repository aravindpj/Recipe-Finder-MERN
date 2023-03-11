import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Recipeview from '../../components/Recipeview/Recipeview'

function Viewdetail() {
  let {recipeId} =useParams()
  const [recipe,setRecipe]=useState([])
  console.log(recipeId);
  const fetchRecipe=async (id)=>{
    const res = await fetch(`https://recipe-finder-4aj5.onrender.com/api/v1/recipe/${id}`)
    if(res.ok){
      const {data}= await res.json()
      setRecipe(data) 
    }
  }
  useEffect(()=>{
    fetchRecipe(recipeId)
  },[])
  return (
    <>
        <Recipeview recipe={recipe}/>
    </>
  )
}

export default Viewdetail
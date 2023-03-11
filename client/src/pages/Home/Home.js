import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';

import Recipes from '../../components/Recipes/Recipes'
import LoadingSpinner from '../../components/Spinner/Spinner'


export default  function Home() {
  const [recipes,setRecipes]=useState([])
  const [loading,setLoading]=useState(false)

  const fetchRecipe=async ()=>{
    setLoading(true)
    const res=await fetch(`https://recipe-finder-4aj5.onrender.com/api/v1/recipe`)
    if(res.ok){
      setLoading(false)
      const {data}=await res.json()
      setRecipes(data)
    }
 }
 useEffect(()=>{
    fetchRecipe()
 },[])

  return (
    <>
    {
      loading ? <LoadingSpinner/> :  <Recipes recipes={recipes} setRecipes={setRecipes}/>
    }
    </>
  )
}


import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';

import Recipes from '../../components/Recipes/Recipes'
import LoadingSpinner from '../../components/Spinner/Spinner'


export default  function Home() {
  const [recipes,setRecipes]=useState([])
  const [loading,setLoading]=useState(true)

  const fetchRecipe=async ()=>{
    const res=await fetch(`http://localhost:5000/api/v1/recipe`)
    if(res.ok){
      const {data}=await res.json()
      setRecipes(data)
    }
 }
 useEffect(()=>{
    fetchRecipe()
    setTimeout(() => {
       setLoading(false)
    },1000);
 },[])

  return (
    <>
    {
      loading ? <LoadingSpinner/> :  <Recipes recipes={recipes} setRecipes={setRecipes}/>
    }
    </>
  )
}


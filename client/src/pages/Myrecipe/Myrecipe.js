import React, { useEffect, useState } from 'react'
import './Myrecipe.css'

import Cookies from 'js-cookie'
import LoadingSpinner from '../../components/Spinner/Spinner'
export default  function Myrecipe() {
   const [userRecipe,setRecipe]=useState([])
   const token = Cookies.get("token")
  const [loading ,setLoading]=useState(false)
   const fetchUserrecipe=async function(){
      setLoading(true)
      fetch(`https://recipe-finder-4aj5.onrender.com/api/v1/user/getmyrecipe`,{
         headers:{
            Authorization:`Bearer ${token}`
         }
      }).then((res)=>res.json()).then(({data})=>{
         console.log(data) 
         setRecipe(data)
         setLoading(false)
      })
   }
   async function handleDelete(id){
      const res=await fetch(`https://recipe-finder-4aj5.onrender.com/api/v1/recipe/${id}`,{
         method:"DELETE",
         headers:{
            Authorization:`Bearer ${token}`
         }
      })
      if(res.ok){
         console.log('del working');
         let data=userRecipe.filter(data=>data._id !== id)
         setRecipe(data)
      }
   }
   useEffect(()=>{
       fetchUserrecipe()
   },[])
  return (
    <>
    {
      loading ? <LoadingSpinner/> :
         <div className='myrecipe'>
         {
            userRecipe?.map((recipe)=>{
               return(
                  <div className="Myrecipe-card">
                     <div className="image-container">
                        <img src={recipe.imageurl} alt="" />
                     </div>
                     <div className="infodata">
                        <div>Recipe : {recipe.title}</div>
                        <div>Preperation :{recipe.preperationtime}</div>
                        <div>Serving : {recipe.serving}</div>
                        <div>url:  <a href={recipe.url}>Link</a> </div>
                     </div>
                     <div className="delete">
                        <button onClick={()=>handleDelete(recipe._id)}>Delete</button>
                     </div>
               </div>
               )
            })
         }
         </div>
    }

    </>
  )
}


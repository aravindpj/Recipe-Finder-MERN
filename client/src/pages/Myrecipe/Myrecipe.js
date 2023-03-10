import React, { useEffect, useState } from 'react'
import './Myrecipe.css'

import Cookies from 'js-cookie'
import LoadingSpinner from '../../components/Spinner/Spinner'
export default  function Myrecipe() {
   const [userRecipe,setRecipe]=useState([])
   const token = Cookies.get("token")
  
   const fetchUserrecipe=async function(){
     
      fetch(`http://localhost:5000/api/v1/user/getmyrecipe`,{
         headers:{
            Authorization:`Bearer ${token}`
         }
      }).then((res)=>res.json()).then(({data})=>{
         console.log(data) 
         setRecipe(data)
      })
   }
   async function handleDelete(id){
      const res=await fetch(`http://localhost:5000/api/v1/recipe/${id}`,{
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
    </>
  )
}


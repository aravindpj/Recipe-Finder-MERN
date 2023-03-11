import React, { useEffect, useState } from 'react'
import pizza from '../../assets/pizza.jpg'
import user from '../../assets/user.jpg'
import sendIcon from '../../assets/icons/send.png'
import './Recipeview.css'
import LoadingSpinner from '../Spinner/Spinner'
import Cookies from 'js-cookie'
function Recipeview({recipe,fetchRecipe}) {
   const token = Cookies.get("token")
   const [loading,setLoading]=useState(true)
   const [loadingReview,setLoadingreview]=useState(false)
  const [reviewData,setReview]=useState({
   review:"",
  })

 async function handleSubmit(e){
   e.preventDefault()
   if(!token) return alert('Login to continue')
   setLoadingreview(true)
   console.log(token);
   const res=await fetch(`https://recipe-finder-4aj5.onrender.com/api/v1/recipe/review/${recipe._id}`,{
      method:"POST",
      headers:{
         Authorization:`Bearer ${token}`,
        "content-type":"application/json"
      },
      body:JSON.stringify(reviewData)
   })
   if(res.ok){
      setLoadingreview(false)
      fetchRecipe(recipe._id)
   }

  }
   
   useEffect(()=>{
      setTimeout(() => {
         setLoading(false)
      },1000);
   },[])
 
  return (
     <>
       {loading ? <LoadingSpinner/> :
        
        <div className='view-detail'>
        <div className="banner">
         <div className="image">
             <img src={recipe.imageurl} alt=""/>
         </div>
         <div className="detail-description">
            <h3>{recipe.title}</h3>
            <p>
               {recipe.description}
            </p>
            <a href={recipe?.url}>
            <button  className='more-info'>More info &rarr;</button>
            </a>
          
         </div>
        </div>
        <div className="user-data">
             <img src={user} alt="" />
              <p>{recipe.user?.fullname}</p>
        </div>
        <div className="time-and-serving">
            <p className="time"><span>{recipe.preperationtime}</span> Minutes to cook</p>
            <p className="serving"><span>{recipe.serving}</span> Serving</p>
        </div>
        <div className="recipe-ingredients">
          <h2>Incredients</h2>
           <div className="ingredients">
                 <ul>
                   {
                     recipe.ingredients?.map(el=><li>{el.ingredient}</li>)
                   }
                 </ul>
           </div>
        </div>
        <div className="reviews">
           <h2>Reviews</h2>
           {loadingReview && <p style={{color:"orange",fontSize:"13px",padding:"10px"}}>Loading....</p>}
           <form onSubmit={handleSubmit} className="comment-sec">
             <input type="text" name="review" onChange={(e)=>setReview({[e.target.name]:e.target.value})} className='comment'placeholder='Comment here...'/>
             <button type='submit' className="send"><img src={sendIcon} alt="" /></button>
           </form>

           {
               recipe.reviews?.map((data)=>
               <>
                  <div className="review-card">
                     <p className='user-name'>@{data.user.fullname}</p>
                     <p className='review-text'>{data.review}</p>
               </div>
               </>
            ).reverse()
           }
        </div>
     </div>
        
       }
     </>

  )
}

export default Recipeview
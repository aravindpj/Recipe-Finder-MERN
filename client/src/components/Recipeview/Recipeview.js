import React, { useEffect, useState } from 'react'
import pizza from '../../assets/pizza.jpg'
import user from '../../assets/user.jpg'
import sendIcon from '../../assets/icons/send.png'
import './Recipeview.css'
import LoadingSpinner from '../Spinner/Spinner'
function Recipeview({recipe}) {
   const [loading,setLoading]=useState(true)
   console.log(recipe.ingredients);
   console.log(recipe);

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
           <form className="comment-sec">
             <input type="text" className='comment'placeholder='Comment here...'/>
             <button type='submit' className="send"><img src={sendIcon} alt="" /></button>
           </form>
            <div className="review-card">
                <p className='user-name'>Steve</p>
                 <p className='review-text'> Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Sed porttitor lectus nibh.</p>
            </div>
            <div className="review-card">
                <p className='user-name'>Steve</p>
                 <p className='review-text'> Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Sed porttitor lectus nibh.</p>
            </div>
        </div>
     </div>
        
       }
     </>

  )
}

export default Recipeview
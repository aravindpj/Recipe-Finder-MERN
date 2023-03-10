import React, { useEffect, useState } from 'react'
import Wicon from '../../assets/icons/wishlist.png'
import './Recipes.css'
import { Link, useOutletContext } from 'react-router-dom'
import LoadingSpinner from '../Spinner/Spinner'

function Recipeview({recipes,setRecipes}) {
    const [searchData,setData] = useOutletContext();
    const [sResult,setSresult]=useState([])
    const [loading,isLoading]=useState()

    let data = sResult.length>0 ? sResult : recipes
    /// need re render the componet 
    function render(){
        setSresult(searchData)
        searchData.length !==0 && isLoading(true)
    }
    useEffect(()=>{
        render()
        setTimeout(() => {
            isLoading(false)
        }, 1000);
    },[searchData])
  return (
        <>
         
         {loading ? <LoadingSpinner/> : 
            <main>
                    <div className="head-section">
                    <div className="heading">
                    <h2>Recipe Results</h2>
                        <p className='recipes-found'>{326} recipes found <span>Edit ingredients & Restriction </span></p>
                    </div>
                </div>
                {
                sResult.length !==0 && <button className='clearsearch' onClick={()=>{
                    //reset values to 
                    setData('')
                    setSresult('')
                    setRecipes(recipes)
                    }} >&larr; Clear</button>
                }

                <div className="card-body">
                
                {
                    data.map(data=>{
                    return(
                        <Link to={`/recipeview/${data._id}`} style={{ textDecoration: 'none' }}>
                            <div className="card">
                                <img src={data.imageurl} alt="" />
                                <div className="info">
                                <div className='title-data'>
                                    <p className='title1'>{data.title}</p>
                                    <p className='title2'>Rating <span>4.5</span></p>
                                </div>
                                    <div className="addwishlist">
                                    <img src={Wicon} className='add-wish' alt="" style={{width:"27px"}}/>          
                                    </div>
                                </div>
                                </div>
                        </Link>

                    )
                    })
                }
                {/* <div className="card">
                        <img src={pizza} alt="" />
                        <div className="info">
                        <div className='title-data'>
                            <p className='title1'>Pizza</p>
                            <p className='title2'>Rating <span>4.5</span></p>
                        </div>
                            <div className="addwishlist">
                            <img src={Wicon} className='add-wish' alt="" style={{width:"27px"}}/>          
                            </div>
                        </div>
                </div> */}
                </div>
            </main> 

         }
           
        </>

  )
}

export default Recipeview
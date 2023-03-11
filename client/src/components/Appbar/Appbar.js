import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Sicon from '../../assets/icons/s-icon.png'
import Wicon from '../../assets/icons/wishlist.png'
import { logout } from '../../store/auth'

import './Appbar.css'
export default function Appbar({setData}){
    const [search,setSearch]=useState('')
    const {authenticated,user}=useSelector(state=>state.auth)
    const dispatch=useDispatch()
    let navigate = useNavigate()
    function _logout(){
        Cookies.remove("token")
        dispatch(logout())
        navigate('/signin')
    }
    const fetchSearchrecipe=async (query)=>{
        if (query === "") return
        const res=await fetch(`https://recipe-finder-4aj5.onrender.com/api/v1/recipe?search=${query}`)
        if(res.ok){
          const {data}=await res.json()
          setData(data)
          navigate('/')
        }
     }
     function handleSubmit(e){
        e.preventDefault()
        fetchSearchrecipe(search)
        setSearch('')
     }
    
    return(
     <nav>
        <div className='left-side'>
            <Link to="/" onClick={()=>setData('')} style={{ textDecoration: 'none' }}>
               <h3><span>G</span>orama</h3>
            </Link>
        </div>
        <div className="middel-side">
             <ul>
                {
                    authenticated && <>
                        <li>My ingredients</li>
                        <Link style={{ textDecoration: 'none' }} to="/myrecipe"><li>My recipes</li></Link>      
                        <li>Tips</li>
                    </>
                }

             </ul>
        </div>
        <div className="right-side">
            <form onSubmit={handleSubmit}  className="search">
                <input type="text" value={search}  onChange={(e)=>setSearch(e.target.value)} placeholder='Search recipe'/>
                <button type='submit' className='search-btn'  >
                   <img src={Sicon} className='s-icon' alt=""/>
                </button>
            </form>
            <div className="wishlist">
               <img src={Wicon} className='w-icon' alt=""/>
            </div>
        </div>
        <div className="right-btns">
            {!authenticated && <>
                <Link to="/signin"><button className='signin'>Sign In</button></Link> 
                <Link to="/signup"><button className='signin'>Sign Up</button></Link> 
            </>}
            {
                authenticated && <>
                    <img className='profile' src={`https://recipe-finder-4aj5.onrender.com/user/${user.profile}`} />
                    <p className='name'>{user.fullname}</p>
                    <Link to="/addrecipe"><button className='addbtn'>Add Recipe</button></Link>
                    <button className='signin' onClick={_logout} >Logout</button>
                </>
            }
        </div>
     </nav>
    )
}


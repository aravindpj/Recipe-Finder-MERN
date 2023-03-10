import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import loginIcon from '../../assets/icons/login.png'
import { setUser } from '../../store/auth'
import './Signin.css'
function Signin() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form,setform]=useState({
    email:"",
    password:""
  })
  function handleChange (e){
    setform({...form,[e.target.name]:e.target.value})
  }
  async function handleSubmit(e){
    e.preventDefault()
    const res=await fetch(`http://localhost:5000/api/v1/user/login`,{
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify(form)
    })
    if(res.ok){
      const {token,user}=await res.json()
      Cookies.set('token',token)
      dispatch(setUser({user}))
      navigate('/')
    }
  }
  return (
    <div className='signin-page'>
        <div className="login-icon">
             <img src={loginIcon} alt="" />
          </div>
         <form onSubmit={handleSubmit} className='signin-form'>
            <label>Email</label>
            <input type="email" name='email' value={form.email} onChange={handleChange} placeholder='email...'/>
            <label>Password</label>
            <input type="password" name='password' value={form.password} onChange={handleChange} placeholder='••••••••••' />
            <button className="sigin" >Sign in</button>
         </form>

    </div>
  )
}

export default Signin
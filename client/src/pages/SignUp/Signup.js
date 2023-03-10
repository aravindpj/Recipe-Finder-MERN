import React , {useState}from 'react'
import './Signup.css'
import loginIcon from '../../assets/icons/login.png'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { setUser } from '../../store/auth'

function Signup() {
  const dispatch =useDispatch()
  const [form,setForm] =useState({
        email: "",
        fullname:"",
        password:"",
        username:""
  })
 const navigate = useNavigate()
  function handleChanges (e) {
     setForm({...form,[e.target.name]:e.target.value})
  }

  async function submitForm (e){
    e.preventDefault()
    const res=await fetch(`http://localhost:5000/api/v1/user/signup`,{
      method:"POST",
      body:JSON.stringify(form),
      headers:{
        "content-type":"application/json"
      }
    })
    if(res.ok){
      const {token,user}=await res.json()
      Cookies.set("token",token)
      dispatch(setUser({user}))
      // alert('Your account created')
      navigate('/')
    }
   }

  return (
    <div className='signup-page'>
          <div className="login-icon">
            <img src={loginIcon} alt="" />
        </div>
         <form onSubmit={submitForm} className='signup-form'>
            <label>Full name</label>
            <input type="text" value={form.fullname} name="fullname" onChange={handleChanges} placeholder='fullname'/>
            <label>Username</label>
            <input type="text" value={form.username} name="username" onChange={handleChanges} placeholder='username'/>
            <label>Email</label>
            <input type="email" value={form.email} name="email" onChange={handleChanges} placeholder='email'/>
            <label>Password</label>
            <input type="password" value={form.password} name="password" onChange={handleChanges} placeholder='••••••••••'/>
            <button className="signup" >Signup</button>
         </form>
    </div>
  )
}

export default Signup
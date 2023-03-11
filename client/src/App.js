import { Outlet } from "react-router-dom";
import Appbar from "./components/Appbar/Appbar";
import Cookies from 'js-cookie'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./store/auth";
function App() {
  const token =Cookies.get('token')
  const [searchData,setData]=useState([])
  const dispatch=useDispatch()
  const fetchUser=async () => {
    if(!token) return
     const res=await fetch('https://recipe-finder-4aj5.onrender.com/api/v1/user/getaccount',{
      method:"GET",
      headers:{
        Authorization:`Bearer ${token}`
      }
     })
     const {user} = await res.json()
     if(user){
       dispatch(setUser({user}))
     }
  }
  useEffect(()=>{
    fetchUser()
  },[])
  return (
    <div className="App">
        <Appbar setData={setData}/>
        <Outlet context={[searchData,setData]}/>
    </div>
  );
}

export default App;

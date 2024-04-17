import React, { useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom"
function Login() {
   const [email,setEmail] = useState("")
   const [password,setPassword] = useState("")
   const navigate  = useNavigate()
   useEffect(()=>{
      const authentication = localStorage.getItem("user")
      if(authentication){
        navigate('/')
      }
   },[])

   const loginData = async () => {
    console.log(email, password);
    let data = await fetch(`http://localhost:5000/login`, {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: { // Corrected typo here
        'Content-Type': 'application/json'
      }
    });
    let result = await data.json();
    if (result.auth) { // Assuming you send a success flag in your response
      localStorage.setItem("user",JSON.stringify(result.data))
      localStorage.setItem("token",JSON.stringify(result.auth))
      navigate('/')
    } else {
      alert("Email or password wrong");
    }
  };
  




  return (
    <div className='main1'>
        <div className='login'>
          <h2>Login</h2>
         <div>
          <label>Email</label><br />
          <input type="text" value={email}  onChange={(e)=>setEmail(e.target.value)}  placeholder="Enter your email" required />
        </div>
        <div>
          <label >Password</label><br />
          <input type="text"  value={password}  onChange={(e)=>setPassword(e.target.value)}  placeholder="Enter your password" required />
        </div>
        <div className='btn1'>

         <button onClick={loginData}>Login</button>
        </div>
        </div>
    </div>
  )
}

export default Login
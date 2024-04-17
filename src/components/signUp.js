import React, { useEffect } from 'react';
import { useState } from 'react';
import {useNavigate} from "react-router-dom"

function SignUp() {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
    const auth  = localStorage.getItem('user')
     useEffect(()=>{
       if(auth){
         navigate("/")
       }

     })
const signUpData =async ()=>{
  console.log(name,email,password)
  let result = await fetch('http://localhost:5000/registration',{
    method:"post",
    body:JSON.stringify({name,email,password}),
    headers:{
      'Content-Type':'application/json'
    }
  })
  result = await result.json()
   navigate('/')
   localStorage.setItem("user", JSON.stringify(result.result));
   localStorage.setItem("token", JSON.stringify(result.auth));


}

  return (
    <div className='signup'>
      <div className='sign-up'>
        <h1>Registration</h1>
        <div >
          <label htmlFor="name">Name</label><br />
          <input type="text" value={name} onChange={(e)=>setName(e.target.value)} id="name" placeholder="Enter your name" required />
        </div>
        <div>
          <label htmlFor="email">Email</label><br />
          <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}  id="email" placeholder="Enter your email" required />
        </div>
        <div>
          <label htmlFor="password">Password</label><br />
          <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)}  id="password" placeholder="Enter your password" required />
        </div>
        <div className="btn">
          <button type="submit" onClick={signUpData}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

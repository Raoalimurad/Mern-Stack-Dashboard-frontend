import React, { useEffect, useState } from 'react'
import {useParams,useNavigate} from 'react-router-dom';


function Update() {
    const [name,setName] = useState("");
    const [price,setPrice] = useState("")
    const [category,setCategory] = useState("")
    const params = useParams()
    const navigate = useNavigate()
     useEffect(()=>{
      getDetail()
     },[])
  const getDetail = async()=>{
      const data = await fetch(`http://localhost:5000/delete/${params.id}`,{
        headers:{
          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      })
      const result = await data.json()
      setName(result.name)
      setPrice(result.price)
      setCategory(result.category)
  }
const updateData =async()=>{
   const data = await fetch(`http://localhost:5000/product/${params.id}`,{
    method:'Put',
    body:JSON.stringify({name,price,category}),
    headers:{
      'Content-Type':'application/json',
      authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
   });
   let result = await data.json()
   if(result){
      navigate('/')
   }

}
    
  return (
    <div className='add-product'>
            <h1>Update Products</h1>
            <div>
             <input type='text' value={name}   onChange={(e)=>setName(e.target.value)}        placeholder='Enter  name' />
      
            </div>
            <div>
                <input type='text'  value={price}   onChange={(e)=>setPrice(e.target.value)}     placeholder='Enter product price' />
           
            </div>
            <div>
                <input type='text'value={category}   onChange={(e)=>setCategory(e.target.value)}   placeholder='Enter product category' />
            
            </div>
            <div>
                <button onClick={updateData}>Update</button>
            </div>
        </div>
  )
}

export default Update
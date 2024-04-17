import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

function AddProduct() {
  const [name,setName] = useState("")
  const [price,setPrice] = useState("")
  const [category,setCategory] = useState("")
  const [error,setError] = useState(false)
  const navigate = useNavigate()
  const handleAddProduct=async ()=>{
   if(!name || !price || !category){

    setError(true)
    return false;
   }
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const data = await fetch('http://localhost:5000/add-product',{
        method:"post",
        body:JSON.stringify({name,price,category,userId}),
        headers:{
            'Content-Type':'application/json',
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
        
    })
    let result = await data.json()
    if(result){
        navigate('/')
    }

  }

    return (
        <div className='add-product'>
            <h1>Add Products</h1>
            <div>
             <input type='text' value={name} onChange={(e)=>setName(e.target.value)}        placeholder='Enter your name' />
             {error && !name &&<h4 className='invalid-input'>Enter valid name</h4>}
            </div>
            <div>
                <input type='text'  value={price} onChange={(e)=>setPrice(e.target.value)}          placeholder='Enter product price' />
                {error && !price &&<h4 className='invalid-input'>Enter valid price</h4>}
            </div>
            <div>
                <input type='text'  value={category} onChange={(e)=>setCategory(e.target.value)}      placeholder='Enter product category' />
                {error && !category &&<h4 className='invalid-input'>Enter valid category</h4>}
            </div>
            <div>
                <button onClick={handleAddProduct}>Add product</button>
            </div>
        </div>
    )
}

export default AddProduct
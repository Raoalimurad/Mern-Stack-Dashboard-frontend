import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Product() {
  const [product,setProduct] = useState([]);
  useEffect(()=>{
    showProduct()
  },[])
  
  const showProduct = async () => {
    try {
        let data = await fetch('http://localhost:5000/products',{
          headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        });
        let result = await data.json();
        if (Array.isArray(result)) {
            setProduct(result);
        } else {
            // Handle the case when result is not an array
            console.error("Received non-array data:", result);
        }
    } catch (error) {
        console.error("Error fetching products:", error);
    }
};


  const deleteProduct = async (id)=>{
  let data = await fetch(`http://localhost:5000/delete/${id}`,{
    method:"Delete",
    headers:{
      authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
  });
  let result = await data.json()
  if(result){
    showProduct()
  }
    

  }
const searchHandle = async (event)=>{
  let key = event.target.value;
  if(key){
    
    let data = await fetch(`http://localhost:5000/search/${key}`,{
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    let result = await data.json();
    if(result){
      setProduct(result)
    }
  }else{
    showProduct()
  }
}


  return (
    <div className='product-list'>
        <h2>Product List</h2>
        <input type='text' className='input-box' placeholder='Search Product here ...'  onChange={searchHandle}/>
        <ul >
            <li>S . No</li>
            <li>Name</li>
            <li>Price</li>
            <li>Category</li>
            <li>Operation</li>
        </ul>
        {
    product.map((item, index) => (
        <ul key={item._id}>
            <li>{index+1}</li>
            <li>{item.name}</li>
            <li>${item.price}</li>
            <li>{item.category}</li>
            <li><button  onClick={() => deleteProduct(item._id)} > Delete</button> <button><Link to = {'/update/'+item._id}>update</Link></button></li>
            
        </ul>
    ))
}

    </div>
  )
}

export default Product
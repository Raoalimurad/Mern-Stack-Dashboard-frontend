const express = require("express")
const Jwt = require('jsonwebtoken')
const cors = require("cors")
require('dotenv').config();

require("./db/config")
const User = require("./db/userSechma")
const Product = require('./db/productSechma')
const app = express()
const JwtKey = process.env.JWT_SECRET

app.use(express.json())
app.use(cors())

app.post('/registration',async (req,res)=>{
   let data = new User(req.body);
   let result = await data.save()
   result = result.toObject()
   delete result.password
   Jwt.sign({result},JwtKey,{expiresIn:"24h"},(err,token)=>{
    if(err){
        res.send("something went wrong")
    }
    res.send({result,auth:token})
})
    
})
app.listen(5000)


////post api of login

app.post("/login",async(req,res)=>{
    let getData =req.body
    if(getData.email && getData.password){
        let data =await User.findOne(getData).select('-password')
        if(data){
            Jwt.sign({data},JwtKey,{expiresIn:"24h"},(err,token)=>{
                if(err){
                    res.send("something went wrong")
                }
                res.send({data,auth:token})
            })

            
       
        }else{
         res.send("check emial or password")
        }

    }else{
        res.send("not data found")
    }
   
    
})
/////add product api
app.post('/add-product',verifyToken, async (req,res)=>{
    let data = new Product(req.body)
    console.log(req.body)
    let result = await data.save()
    res.send(result)
})

app.get("/products",verifyToken,async(req,res)=>{
   let data =await Product.find()
   if(data.length>0){

       res.send(data)
   }else{
    res.send("result not found")
   }
})

////delete api
app.delete('/delete/:id',verifyToken,async(req,res)=>{
    console.log(req.params)
    let data =await Product.deleteOne({_id:req.params.id})
    res.send(data)
})

app.get('/delete/:id',verifyToken,async (req,res)=>{
    
    let data = await Product.findOne({_id:req.params.id})
    if(data){
        res.send(data)
    }else{
        res.send("result not found")
    }
})
app.put("/product/:id",verifyToken,async (req,res)=>{
    let data = await Product.updateOne(
     {_id:req.params.id},{
        $set:req.body
       }
       
    )
    res.send(data)
})
app.get('/search/:key',verifyToken,async (req,res)=>{
    let data = await Product.find(
        {
            '$or':[
                {name:{$regex:req.params.key}},
                {category:{$regex:req.params.key}},
            ]
        }
    )
    res.send(data)
})
function verifyToken(req, res, next) {
    let getToken = req.headers['authorization'];
    if(getToken){
       getToken = getToken.split(' ')[1];
       Jwt.verify(getToken,JwtKey,(err,valid)=>{
        if(err){
            res.status(401).send({result:"please provide valid token"})
        }else{
            next();
        }
       })

    }else{
        res.status(403).send({result:"Token is necessary"})
    }
    
    
}

const mongoose = require("mongoose")
try{
    mongoose.connect("mongodb://localhost:27017/e-comerce");
    console.log("MongoDB connected successfully!");
}catch(error){
  console.log("Error connecting to MongoDB:", error)
}

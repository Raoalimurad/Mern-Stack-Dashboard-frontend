const mongoose = require("mongoose")
const productSechma = new mongoose.Schema(
    {
        name:String,
        price:Number,
        category:String,
        userId:String
    }
)
module.exports = mongoose.model("products",productSechma)
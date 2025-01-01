import mongoose, { Schema } from "mongoose";
const productSchema=new Schema({
    img:{type:String},
    name:{type:String,required:true,trim:true},
    description:{type:mongoose.Schema.Types.Mixed},
    price:{type:Number,required:true},
    author:{type:String,ref:'Usersauth'}
},{timestamps:true})

const product=new mongoose.model("product",productSchema);
export default product;
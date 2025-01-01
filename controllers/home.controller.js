import product from "../models/product.model.js";
import { uploadimg } from "../utils/cloudinary.js";
import path from "path"
import Usersauth from "../models/User.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { configDotenv } from "dotenv";
configDotenv();
const getproduct=async(req,res)=>{
    const {id}=req.params;
try{
  const allproduct=await product.find({author:id}).populate('author','name email');
  res.send(allproduct); 
}catch(err){
    res.status(401).json({message:"product not found"});
}
};

const getspecificproduct=async(req,res)=>{
    const {id}=req.params;
try{
  const specproduct=await product.find({_id:id});
  res.send(specproduct); 
}catch(err){
    res.status(401).json({message:"product not found"});
}
};

const createproduct=async(req,res)=>{

    const {img,name,description,price,author}=req.body;
    try{
      if(name&&price){
            const newproduct=new product({img,name,description,price,author});
            await newproduct.save().then(data=>res.send(data)).catch(err=>console.log(err))
      }
     }catch(err){
        res.status("401").json({message:"not able to create product"});
    }
}
const deleteproduct=async(req,res)=>{
    const {id}=req.params;
    try{
        await product.findByIdAndDelete({_id:id}).then(data=>res.send("user deleted")).catch(err=>console.log(err));
    }catch(err){
        res.status(401).json({message:"product not found"});
    }
}
const editproduct=async(req,res)=>{
    const {id}=req.params;
  const {img,name,description,price}=req.body;
    try{
        const update=await product.findByIdAndUpdate(id,{img,name,description,price}).catch(err=>console.log(err));
        await res.send(`updated info: ${update}`)
        
    }catch(err){
        res.status(401).json({message:"Not able to update product"});
    }
}
const searchproduct=async(req,res)=>{
const query=req.query.q;
const {id}=req.params
if (!query){ 
    return res.status(400).send('Query parameter is missing');
}
const regexpattern=query.split('').join('.*')
const regex=new RegExp(regexpattern,'i');
try {
    
  //   const items = await product.find({ name: regex }); 
     const items = await product.find({author:id, name: regex }); 
    return res.status(200).json({items,regexpattern}); 
    }catch(err)
    {
     return res.status(500).send(err.message);
     }
}

const uploadfile=async(req,res)=>{
   let localfile=path.join(process.cwd(), '/uploads', req.file.filename);
   let result=await uploadimg(localfile);
   res.send(result)
}

const login=async(req,res)=>{
  const {email,password}=req.body;
try{
   const user= await Usersauth.findOne({email});
   if(!user){
    return res.status(400).json({message:"Invalid username and password"});
   }
   const check=await bcrypt.compare(password,user.password);
   if(!check){
    return res.status(400).json({message:"Invalid username and password"});
   }
   const generatetoken=await jwt.sign({id:user._id, name:user.name,email:user.email},process.env.JWT_SECRET_KEY,{expiresIn:"30d"});
   return res.status(200).json({message:"User loggedin",token:generatetoken,user});
}catch(err){
    res.status(500).json({message:err.message})
}

}

const register=async(req,res)=>{
    const {name,email,password,isAdmin}=req.body;
    if(!name||!email||!password){
        return res.status(400).json({message:"Enter the fields"})
    }
    try{
        const hashpassword=await bcrypt.hash(password,10);
        const newuser=new Usersauth({name,email,password:hashpassword,isAdmin});
        await newuser.save();
      return res.status(200).json({message:"User created"})
    }catch(err){
     res.status(500).json({ message: 'Already account created please login' }); 
    }
}
export {register,login,getproduct,createproduct,getspecificproduct,deleteproduct,editproduct,searchproduct,uploadfile};

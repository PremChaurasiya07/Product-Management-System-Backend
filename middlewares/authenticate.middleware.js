import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();
const authenticate=async(req,res,next)=>{
    const token=req.header('Authorization')?.split(" ")[1];
    console.log(token)
    if(!token) return res.status(401).json("User not registered");
    jwt.verify(token,process.env.JWT_SECRET_KEY,(err,user)=>{
            if (err) return res.status(403).json({ message: 'Invalid Token' });
             req.user = user; 
             next();
        });
   
}

export default authenticate;
import mongoose from "mongoose";
const connectdb=async(url)=>{
    try{
        await mongoose.connect(url);
        console.log("db connected");
    }catch(err){
        console.log(err.message);
    }
 
}
export default connectdb
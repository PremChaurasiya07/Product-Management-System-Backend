import mongoose from "mongoose";

const usermodel=mongoose.Schema({
    name:{type:String,reqired:true,trim:true},
    email:{type:String,required:true,trim:true,unique:true},
    password:{type:String,
              required:true,
              minLength: [6, 'Password must be at least 6 characters long']
            },
    isAdmin:{type:Boolean,default:false}
},{timestamps:true})

const Usersauth=new mongoose.model('Usersauth',usermodel);
export default Usersauth
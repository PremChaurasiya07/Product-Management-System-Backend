import multer from "multer";
import { v2 as cloudinary } from 'cloudinary';
import { configDotenv } from "dotenv";
import path from "path";
import fs from 'fs'
configDotenv();
const storage=multer.diskStorage({
    
    destination:(req,file,cb)=>{
        cb(null,path.join(process.cwd(),'temp/uploads/'));
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});

let upload=multer({storage:storage});

cloudinary.config({ 
    cloud_name: 'dh88sttod', 
    api_key: '197548345365812', 
    api_secret:process.env.CLOUD_SECKEY
});

const uploadimg=async(filepath)=>{
    let filePathOnCloudinary = path.basename(filepath, path.extname(filepath));
    return cloudinary.uploader.upload(filepath,{public_id:filePathOnCloudinary}).then(result=>{
       fs.unlinkSync(filepath);
      return (result.url)
    }).catch(err=>{
        fs.unlinkSync(filepath);
       console.log(err);
    })
};

export {upload,uploadimg}
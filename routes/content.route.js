import express from "express";
import { getproduct,register,createproduct, deleteproduct, editproduct, searchproduct, getspecificproduct, uploadfile, login } from "../controllers/home.controller.js";
import { upload,uploadimg } from "../utils/cloudinary.js";
import authenticate from "../middlewares/authenticate.middleware.js";
const router=express.Router();
router.get('/', (req, res) => 
     res.send('API is working!')
);
router.route('/auth/login').post(login);
router.route('/auth/register').post(register);
router.route('/home/:id').get(authenticate,getproduct);
router.route('/home/info/:id').get(getspecificproduct);
router.route('/:id/search').get(searchproduct);
router.route('/home/delete/:id').delete(deleteproduct);
router.route('/home/edit/:id').put(editproduct);
router.route('/home/create').post(createproduct);
router.route('/home/create/upload').post(upload.single('file'),uploadfile);

export default router
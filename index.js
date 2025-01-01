import { configDotenv } from 'dotenv';
import express, { urlencoded } from 'express';
import cors from 'cors';
import connectdb from './db/db.js';
import { upload } from './utils/cloudinary.js';
import router from './routes/content.route.js';

const app=express();
configDotenv();
app.use(cors());
app.use(express.json());
app.use(urlencoded());


const PORT=process.env.PORT||5000;
const DBURL=process.env.DB_URL;

connectdb(DBURL);
app.use('/api',router);
app.listen(PORT,()=>{
    console.log(`Server is connected at port:${PORT}`);
});
export {upload}
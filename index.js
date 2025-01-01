import { configDotenv } from 'dotenv';
import express, { urlencoded } from 'express';
import cors from 'cors';
import connectdb from './db/db.js';
import router from './routes/content.route.js';
import bodyParser from 'body-parser';

const app=express();
configDotenv();
app.use(cors());
app.use(express.json());
app.use(urlencoded());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());


const PORT=process.env.PORT||5000;
const DBURL=process.env.DB_URL;

connectdb(DBURL);
app.use('/api',router);
app.listen(PORT,()=>{
    res.send(`Server is connected at port:${PORT}`);
});
export default app;
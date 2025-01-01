import { configDotenv } from 'dotenv';
import express from 'express';
import cors from 'cors';
import connectdb from './db/db.js';
import router from './routes/content.route.js';
// import bodyParser from 'body-parser';
configDotenv();
const app=express();
const PORT=process.env.PORT||5000;
const DBURL=process.env.DB_URL;
// app.use(bodyParser.urlencoded({ extended: true })); 
// app.use(bodyParser.json());

app.use(cors(
    { origin: 'http://localhost:5173', }
));
app.use(express.json());




connectdb(DBURL);
app.use('/api',router);
app.listen(PORT,()=>{
    console.log(`Server is connected at port:${PORT}`);
});

export default app

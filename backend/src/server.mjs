import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config();
import userRouter from './routes/userRoute.js';

const port = process.env.PORT;
const app = express();

// cors authentication middleware
var corsOptions = {
    origin: 'http://127.0.0.1:5500',
    optionsSuccessStatus: 200
  }

//middlewares
app.use(cors(corsOptions));
app.use(express.json());

//file upload config
app.use('/uploads', express.static('uploads'));

//routes
app.use('/api', userRouter);
app.use('/api', fileRouter);

app.listen(port, ()=>{
    console.log(`The app is listening at the PORT: ${port}🔥`)
})